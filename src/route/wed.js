import express from "express";
import HomeController from "../controllers/HomeController";
import UserController from "../controllers/UserController";

let router = express.Router();
let initWedRouter = (app) => {
  router.get("/", HomeController.getHomePage);

  router.post("/API/Login", UserController.login);
  return app.use("/", router);
};

module.exports = initWedRouter;
