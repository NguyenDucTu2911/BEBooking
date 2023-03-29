import express from "express";
import HomeController from "../controllers/HomeController";
import UserController from "../controllers/UserController";
import DoctorController from "../controllers/DoctorController";

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
  router.get("/api/allcode", UserController.getAllcode);
  router.get("/api/TopDoctorHome", DoctorController.TopDoctorHome);
  router.get("/api/AllDoctorHome", DoctorController.AllDoctorHome);
  router.post("/api/save-info-doctor", DoctorController.saveInfoDoctor);
  router.get("/api/get-info-doctor", DoctorController.getInfoDoctor);

  return app.use("/", router);
};

module.exports = initWedRouter;
