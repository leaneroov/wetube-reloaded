import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter.js";
import videoRouter from "./routers/videoRouter.js";
import userRouter from "./routers/userRouter.js";
import apiRouter from "./routers/apiRouter.js";
import { localsMiddleware } from "./middlewares.js";

console.log(process.cwd());

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   maxAge: 20000, //쿠키 수명
    // },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

// app.get("/add-one", (req, res, next) => {
//   req.session.potato += 1;
//   return res.send(`${req.session.id}\n${req.session.potato}`);
// });
app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

export default app;
//npm run dev
// npm run assets
//ctl + c server end
//글로벌 컨트롤러는 필요없음.
