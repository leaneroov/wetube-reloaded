const form = document.getElementById("uploadForm");
const statusMessage = document.getElementById("statusMessage");
const progressBar = document.getElementById("progressBar");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    statusMessage.innerText = "업로드 준비 중...";
    progressBar.style.display = "block";
    progressBar.style.width = "10%";

    const videoInput = document.getElementById("video");
    const thumbInput = document.getElementById("thumb");
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const hashtagsInput = document.getElementById("hashtags");

    if (
      !videoInput ||
      !videoInput.files[0] ||
      !thumbInput ||
      !thumbInput.files[0]
    ) {
      statusMessage.innerText = "비디오와 썸네일 파일을 선택해주세요.";
      progressBar.style.display = "none";
      return;
    }

    try {
      const videoFile = videoInput.files[0];
      statusMessage.innerText = "비디오 URL 생성 중...";
      progressBar.style.width = "20%";

      let videoUrlResponse;
      try {
        videoUrlResponse = await fetch("/api/videos/presigned-url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileType: "video",
            fileName: videoFile.name,
            contentType: videoFile.type,
          }),
        });
      } catch (fetchError) {
        throw new Error(`비디오 URL 요청 실패: ${fetchError.message}`);
      }

      if (!videoUrlResponse.ok) {
        try {
          const errorText = await videoUrlResponse.text();
        } catch (textError) {
          throw new Error(`비디오 URL 생성 실패: ${videoUrlResponse.status}`);
        }
      }

      let videoUrlData;
      try {
        videoUrlData = await videoUrlResponse.json();
      } catch (jsonError) {
        throw new Error("서버 응답을 파싱할 수 없습니다");
      }

      if (
        !videoUrlData.success ||
        !videoUrlData.presignedUrl ||
        !videoUrlData.fileUrl
      ) {
        throw new Error("서버에서 올바른 URL 정보를 받지 못했습니다");
      }

      // 2. 썸네일 presigned URL 요청
      const thumbFile = thumbInput.files[0];
      statusMessage.innerText = "썸네일 URL 생성 중...";
      progressBar.style.width = "30%";

      let thumbUrlResponse;
      try {
        thumbUrlResponse = await fetch("/api/videos/presigned-url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileType: "thumbnail",
            fileName: thumbFile.name,
            contentType: thumbFile.type,
          }),
        });
      } catch (fetchError) {
        throw new Error(`썸네일 URL 요청 실패: ${fetchError.message}`);
      }

      if (!thumbUrlResponse.ok) {
        try {
          const errorText = await thumbUrlResponse.text();
        } catch (textError) {}
        throw new Error(`썸네일 URL 생성 실패: ${thumbUrlResponse.status}`);
      }

      let thumbUrlData;
      try {
        thumbUrlData = await thumbUrlResponse.json();
      } catch (jsonError) {
        throw new Error("서버 응답을 파싱할 수 없습니다");
      }

      statusMessage.innerText = "비디오 파일 업로드 중...";
      progressBar.style.width = "50%";

      let videoUploadResponse;
      try {
        videoUploadResponse = await fetch(videoUrlData.presignedUrl, {
          method: "PUT",
          body: videoFile,
          headers: {
            "Content-Type": videoFile.type,
          },
        });
      } catch (uploadError) {
        throw new Error(`비디오 업로드 실패: ${uploadError.message}`);
      }

      if (!videoUploadResponse.ok) {
        try {
          const errorText = await videoUploadResponse.text();
        } catch (textError) {
          throw new Error(`비디오 업로드 실패: ${videoUploadResponse.status}`);
        }
      }

      // 4. 썸네일 파일 업로드
      statusMessage.innerText = "썸네일 파일 업로드 중...";
      progressBar.style.width = "70%";

      let thumbUploadResponse;
      try {
        thumbUploadResponse = await fetch(thumbUrlData.presignedUrl, {
          method: "PUT",
          body: thumbFile,
          headers: {
            "Content-Type": thumbFile.type,
          },
        });
      } catch (uploadError) {
        throw new Error(`썸네일 업로드 실패: ${uploadError.message}`);
      }

      if (!thumbUploadResponse.ok) {
        try {
          const errorText = await thumbUploadResponse.text();
        } catch (textError) {
          throw new Error(`썸네일 업로드 실패: ${thumbUploadResponse.status}`);
        }
      }

      // 5. 최종 DB 저장 요청
      statusMessage.innerText = "데이터베이스에 정보 저장 중...";
      progressBar.style.width = "90%";

      let finalizeResponse;
      try {
        finalizeResponse = await fetch("/api/videos/finalize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: titleInput.value,
            description: descriptionInput.value,
            hashtags: hashtagsInput.value,
            videoUrl: videoUrlData.fileUrl,
            thumbUrl: thumbUrlData.fileUrl,
          }),
        });
      } catch (finalizeError) {
        throw new Error(`DB 저장 요청 실패: ${finalizeError.message}`);
      }

      if (!finalizeResponse.ok) {
        try {
          const errorText = await finalizeResponse.text();
        } catch (textError) {}
        throw new Error(`DB 저장 실패: ${finalizeResponse.status}`);
      }

      let finalizeData;
      try {
        finalizeData = await finalizeResponse.json();
      } catch (jsonError) {
        throw new Error("서버 응답을 파싱할 수 없습니다");
      }

      if (finalizeData.success) {
        statusMessage.innerText = "업로드 완료!";
        progressBar.style.width = "100%";
        window.location.href = `/videos/${finalizeData.videoId}`;
      } else {
        throw new Error(finalizeData.message || "업로드 실패");
      }
    } catch (error) {
      statusMessage.innerText = `업로드 중 오류가 발생했습니다: ${error.message}`;
      progressBar.style.display = "none";

      // 대체: 일반 폼 제출 방식 시도
      const useBackupMethod = confirm(
        "직접 업로드 중 오류가 발생했습니다. 일반 업로드 방식으로 시도할까요?"
      );
      if (useBackupMethod) {
        try {
          const formData = new FormData();
          formData.append("video", videoInput.files[0]);
          formData.append("thumb", thumbInput.files[0]);
          formData.append("title", titleInput.value);
          formData.append("description", descriptionInput.value);
          formData.append("hashtags", hashtagsInput.value);

          statusMessage.innerText = "일반 방식으로 업로드 중...";
          const response = await fetch("/videos/upload", {
            method: "POST",
            body: formData,
          });

          if (response.redirected) {
            window.location.href = response.url;
          } else {
            statusMessage.innerText = "업로드에 실패했습니다.";
          }
        } catch (backupError) {
          statusMessage.innerText = "모든 업로드 방식이 실패했습니다.";
        }
      }
    }
  });
} else {
}
