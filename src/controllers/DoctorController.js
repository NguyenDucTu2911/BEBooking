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

module.exports = {
  TopDoctorHome,
};
