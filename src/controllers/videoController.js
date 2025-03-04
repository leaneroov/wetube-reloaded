import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";
import AWS from "aws-sdk";

// AWS S3 설정
AWS.config.update({
  region: "ap-northeast-2", // 원하는 리전으로 변경
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});

const s3 = new AWS.S3();
const BUCKET_NAME = "wetube-darren"; // 버킷 이름

// S3 Presigned URL 생성 함수
const generateUploadPresignedUrl = async (fileType, fileName, contentType) => {
  // 파일 확장자 추출
  const fileExtension = fileName.split(".").pop();

  // 사용자 ID와 타임스탬프로 유니크한 키 생성
  const uniqueKey = `${fileType}/${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 12)}.${fileExtension}`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: uniqueKey,
    ContentType: contentType,
    ACL: "public-read",
    Expires: 60 * 5, // 5분
  };

  try {
    const url = await s3.getSignedUrlPromise("putObject", params);
    return {
      url,
      fileUrl: `https://${BUCKET_NAME}.s3.amazonaws.com/${uniqueKey}`,
    };
  } catch (error) {
    throw error;
  }
};

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner").populate("comments");
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "Not authorized");
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "You are not the the owner of the video.");

    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { video, thumb } = req.files;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: video[0].location,
      thumbUrl: thumb[0].location,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`, "i"),
      },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id);
  video.save();
  return res.status(201).json({ newCommentId: comment._id });
};

export const deleteComment = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
  } = req;
  const comment = await Comment.findById(id);
  const video = await Video.findById(comment.video);
  if (!comment) {
    return res.sendStatus(404);
  }
  if (String(comment.owner) !== String(_id)) {
    return res.sendStatus(403);
  }
  await Comment.findByIdAndDelete(id);
  video.comments.pull(id);
  video.save();
  return res.sendStatus(200);
};

// presigned URL 생성 함수 (추가)
export const getPresignedUrl = async (req, res) => {
  try {
    const { fileType, fileName, contentType } = req.body;

    if (!fileType || !fileName || !contentType) {
      return res.status(400).json({
        success: false,
        message: "필수 정보가 누락되었습니다.",
      });
    }

    const folder = fileType === "video" ? "videos" : "thumbnails";
    const { url, fileUrl } = await generateUploadPresignedUrl(
      folder,
      fileName,
      contentType
    );

    return res.status(200).json({
      success: true,
      presignedUrl: url,
      fileUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
};

// 비디오 등록 완료 함수 (추가)
export const finalizeUpload = async (req, res) => {
  try {
    const {
      user: { _id },
    } = req.session;

    const { title, description, hashtags, videoUrl, thumbUrl } = req.body;

    if (!videoUrl || !thumbUrl) {
      return res.status(400).json({
        success: false,
        message: "비디오와 섬네일 URL이 필요합니다.",
      });
    }

    const newVideo = await Video.create({
      title,
      description,
      fileUrl: videoUrl,
      thumbUrl: thumbUrl,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });

    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    await user.save();

    return res.status(201).json({
      success: true,
      videoId: newVideo._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
};
