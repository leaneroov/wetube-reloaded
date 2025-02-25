import express from "express";
import {watch, getEdit, postEdit, getUpload, postUpload} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);
// /:는 parameter 파라미터. url에 변수를 포함할수 있게 해줌. 

export default videoRouter;