import "dotenv/config";
import "./db.js";
import "./models/Video.js";
import "./models/User.js";
import "./models/Comment";
import app from "./server.js";

const PORT = 3000;

const handleListening = () =>
  console.log(`Server listening on port localhost:${PORT}`); //여기서 ''했음 그러면 안돼!

app.listen(PORT, handleListening); // 외부접속 리슨!

//http://localhost:4000/users/github/callback
