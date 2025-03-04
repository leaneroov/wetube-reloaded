"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _videoController = require("../controllers/videoController");
var _middlewares = require("../middlewares");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var apiRouter = _express["default"].Router();
apiRouter.post("/videos/:id([0-9a-f]{24})/view", _videoController.registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", _videoController.createComment);
apiRouter["delete"]("/comments/:id([0-9a-f]{24})/delete", _videoController.deleteComment);

// S3 직접 업로드를 위한 라우트
apiRouter.post("/videos/presigned-url", _middlewares.protectorMiddleware, _videoController.getPresignedUrl);
apiRouter.post("/videos/finalize", _middlewares.protectorMiddleware, _videoController.finalizeUpload);
var _default = exports["default"] = apiRouter;