import { json } from "body-parser";
import db from "../models/index";
import PatienlServices from "../services/PatienlServices";

let createBook = async (req, res) => {
  try {
    let data = await PatienlServices.createBook(req.body);
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

let createverifyBook = async (req, res) => {
  try {
    let data = await PatienlServices.createverifyBook(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "lỗi form server",
    });
  }
};

module.exports = {
  createBook,
  createverifyBook,
};
