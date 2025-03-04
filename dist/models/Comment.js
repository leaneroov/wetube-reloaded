"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var commentSchema = new _mongoose["default"].Schema({
  text: {
    type: String,
    required: true
  },
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  video: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "Video"
  },
  createdAt: {
    type: Date,
    required: true,
    "default": Date.now
  }
});
var Comment = _mongoose["default"].model("Comment", commentSchema);
var _default = exports["default"] = Comment;