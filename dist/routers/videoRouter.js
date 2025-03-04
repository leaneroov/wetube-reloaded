"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _videoController = require("../controllers/videoController");
var _middlewares = require("../middlewares");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var videoRouter = _express["default"].Router();
videoRouter.get("/:id([0-9a-f]{24})", _videoController.watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(_middlewares.protectorMiddleware).get(_videoController.getEdit).post(_videoController.postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(_middlewares.protectorMiddleware).get(_videoController.deleteVideo);

// 기존 업로드 방식 대신 새로운 방식으로 변경 (multer 미들웨어 제거)
videoRouter.route("/upload").all(_middlewares.protectorMiddleware).get(_videoController.getUpload);
// .post(videoUpload.fields([{ name: "video" }, { name: "thumb" }]), postUpload);
var _default = exports["default"] = videoRouter;