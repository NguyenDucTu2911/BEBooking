import express from "express";
import HomeController from "../controllers/HomeController";
import UserController from "../controllers/UserController";

let router = express.Router();
let initWedRouter = (app) => {
  router.get("/", HomeController.getHomePage);

  //api loggin
  router.post("/api/login", UserController.handleLogin);
  //api crud user
  router.get("/api/User", UserController.getAllUser);
  router.post("/api/CreateUser", UserController.CreateUser);
  router.put("/api/UpdateUser", UserController.UpdateUser);
  router.delete("/api/DeleteUser", UserController.DeleteUser);
  return app.use("/", router);
};

module.exports = initWedRouter;
