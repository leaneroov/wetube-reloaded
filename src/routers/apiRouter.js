import express from "express";
import {
  registerView,
  createComment,
  deleteComment,
  getPresignedUrl,
  finalizeUpload,
} from "../controllers/videoController";
import { protectorMiddleware } from "../middlewares";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);
apiRouter.delete("/comments/:id([0-9a-f]{24})/delete", deleteComment);

// S3 직접 업로드를 위한 라우트
apiRouter.post("/videos/presigned-url", protectorMiddleware, getPresignedUrl);
apiRouter.post("/videos/finalize", protectorMiddleware, finalizeUpload);

export default apiRouter;
