import "./db.js"
import "./models/Video.js";
import app from "./server.js"

const PORT = 4000;

const handleListening = () => 
    console.log(`Server listening on port localhost:${PORT}`); //여기서 ''했음 그러면 안돼!

app.listen(PORT, handleListening) // 외부접속 리슨!