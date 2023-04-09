import express from "express";
import HomeController from "../controllers/HomeController";
import UserController from "../controllers/UserController";
import DoctorController from "../controllers/DoctorController";
import PatienlController from "../controllers/PatienlController";
import { cookieLogin } from "../Middleware/cookieAllDocTor";

let router = express.Router();
let initWedRouter = (app) => {
  router.get("/", HomeController.getHomePage);

  //api loggin
  // router.post("/api/login", cookieLogin, UserController.handleLogin);

  router.post("/api/login", UserController.handleLogin);
  //api crud user
  router.get("/api/User", UserController.getAllUser);
  router.post("/api/CreateUser", UserController.CreateUser);
  router.put("/api/UpdateUser", UserController.UpdateUser);
  router.delete("/api/DeleteUser", UserController.DeleteUser);
  router.get("/api/allcode", UserController.getAllcode);
  //doctor
  router.get("/api/TopDoctorHome", DoctorController.TopDoctorHome);
  router.get("/api/AllDoctorHome", DoctorController.AllDoctorHome);
  router.post("/api/save-info-doctor", DoctorController.saveInfoDoctor);
  router.get("/api/get-info-doctor", DoctorController.getInfoDoctor);
  router.post("/api/create-Schedule", DoctorController.createSchedule);
  router.get("/api/get-schedule", DoctorController.getSchedule);
  router.get("/api/get-extraInfo", DoctorController.getExtraInfo);
  router.get("/api/get-Booking", DoctorController.getBooking);
  router.get("/api/get-AllBooking", DoctorController.getAllBooking);
  router.post("/api/send-remedy", DoctorController.sendRemedy);

  //booking
  router.post("/api/create-book", PatienlController.createBook);
  router.post("/api/verify_create-book", PatienlController.createverifyBook);

  return app.use("/", router);
};

module.exports = initWedRouter;
