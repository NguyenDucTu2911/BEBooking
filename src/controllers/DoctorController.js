import { json } from "body-parser";
import db from "../models/index";
import DoctorServices from "../services/DoctorServices";

let TopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    // let id = req.query.id;
    let response = await DoctorServices.getTopDocTor(+limit);

    return res.status(200).json(response);
  } catch (e) {
    console.log("lỗi", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error form server",
    });
  }
};

let AllDoctorHome = async (req, res) => {
  try {
    let allDoctor = await DoctorServices.getAllDocTor();
    return res.status(200).json(allDoctor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      error: -1,
      errMessage: "lỗi form server",
    });
  }
};

let saveInfoDoctor = async (req, res) => {
  try {
    let data = await DoctorServices.saveInfoDoctor(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      error: -1,
      errMessage: "lỗi form server",
    });
  }
};

let getInfoDoctor = async (req, res) => {
  try {
    let data = await DoctorServices.getInfoDoctor(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      error: -1,
      errMessage: "lỗi form server",
    });
  }
};

let createSchedule = async (req, res) => {
  try {
    let data = await DoctorServices.createSchedules(req.body);
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      error: -1,
      errMessage: "lỗi form server",
    });
  }
};

let getSchedule = async (req, res) => {
  try {
    let data = await DoctorServices.GetSchedule(
      req.query.doctorid,
      req.query.date
    );
    return res.status(200).json(data);
  } catch (error) {
    console.log("err", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: " lỗi form server",
    });
  }
};

let getExtraInfo = async (req, res) => {
  try {
    let data = await DoctorServices.getExtraInfo(req.query.doctorid);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "lỗi form server",
    });
  }
};

let getBooking = async (req, res) => {
  try {
    let data = await DoctorServices.getBooking(req.query.doctorid);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "lỗi form server",
    });
  }
};

let getAllBooking = async (req, res) => {
  try {
    let data = await DoctorServices.getAllBooking(
      req.query.doctorid,
      req.query.date
    );
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "err from server",
    });
  }
};

let sendRemedy = async (req, res) => {
  try {
    let data = await DoctorServices.sendRemedy(req.body);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "loi form server",
    });
  }
};

module.exports = {
  TopDoctorHome,
  AllDoctorHome,
  saveInfoDoctor,
  getInfoDoctor,
  createSchedule,
  getSchedule,
  getExtraInfo,
  getBooking,
  getAllBooking,
  sendRemedy,
};
