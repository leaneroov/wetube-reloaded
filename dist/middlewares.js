"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.videoUpload =
  exports.publicOnlyMiddleware =
  exports.protectorMiddleware =
  exports.localsMiddleware =
  exports.avatarUpload =
    void 0;
var _multer = _interopRequireDefault(require("multer"));
var _clientS = require("@aws-sdk/client-s3");
var _multerS = _interopRequireDefault(require("multer-s3"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
var s3Client = new _clientS.S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});
var s3AvatarStorage = (0, _multerS["default"])({
  s3: s3Client,
  bucket: "wetube-fly-2024-update",
  acl: "public-read",
  key: function key(req, file, cb) {
    cb(
      null,
      "avatars/".concat(req.session.user._id, "/").concat(Date.now().toString())
    );
  },
});
var s3VideoStorage = (0, _multerS["default"])({
  s3: s3Client,
  bucket: "wetube-fly-2024-update",
  acl: "public-read",
  key: function key(req, file, cb) {
    cb(
      null,
      "videos/".concat(req.session.user._id, "/").concat(Date.now().toString())
    );
  },
});
var localsMiddleware = (exports.localsMiddleware = function localsMiddleware(
  req,
  res,
  next
) {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user;
  next();
});
var protectorMiddleware = (exports.protectorMiddleware =
  function protectorMiddleware(req, res, next) {
    if (req.session.loggedIn) {
      return next();
    } else {
      req.flash("error", "Not authorized");
      return res.redirect("/login");
    }
  });
var publicOnlyMiddleware = (exports.publicOnlyMiddleware =
  function publicOnlyMiddleware(req, res, next) {
    if (!req.session.loggedIn) {
      return next();
    } else {
      req.flash("error", "Log in first.");
      return res.redirect("/");
    }
  });
var avatarUpload = (exports.avatarUpload = (0, _multer["default"])({
  limits: {
    fileSize: 3000000,
  },
  storage: s3AvatarStorage,
}));
var videoUpload = (exports.videoUpload = (0, _multer["default"])({
  limits: {
    fileSize: 10000000,
  },
  storage: s3VideoStorage,
}));
