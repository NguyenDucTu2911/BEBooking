import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWedRoutes from "./route/wed";
import ConnectDb from "./config/ConnectDb";
import cors from "cors";

require("dotenv").config();

let app = express();
app.use(cookieParser());
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_FE);

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

viewEngine(app);
initWedRoutes(app);

ConnectDb();

let port = process.env.PORT;
app.listen(port, () => {
  console.log("thanh cong");
});
