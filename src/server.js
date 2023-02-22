import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWedRoutes from "./route/wed";
import ConnectDb from "./config/ConnectDb";
require("dotenv").config();

let app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

viewEngine(app);
initWedRoutes(app);

ConnectDb();

let port = process.env.PORT;
app.listen(port, () => {
  console.log("thanh cong");
});
