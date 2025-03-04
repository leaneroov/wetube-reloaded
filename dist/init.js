"use strict";

require("dotenv/config");
require("./db.js");
require("./models/Video.js");
require("./models/User.js");
require("./models/Comment");
var _server = _interopRequireDefault(require("./server.js"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
var PORT = 3000;
var handleListening = function handleListening() {
  return console.log("Server listening on port localhost:".concat(PORT));
};

_server["default"].listen(PORT, handleListening); // 외부접속 리슨!

//http://localhost:4000/users/github/callback
