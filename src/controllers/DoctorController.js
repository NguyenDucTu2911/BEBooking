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
module.exports = {
  TopDoctorHome,
  AllDoctorHome,
  saveInfoDoctor,
  getInfoDoctor,
};
