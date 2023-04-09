import { json } from "body-parser";
import db from "../models/index";
import userServices from "../services/UserServices";

let handleLogin = async (req, res) => {
  let username = req.body.email;
  let password = req.body.password;
  if (!username || !password) {
    return res.status(500).json({
      errCode: 1,
      Message: "vui long nhap day du thong tin",
    });
  }

  let userData = await userServices.handleUserLogin(username, password);
  console.log(userData);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let getAllUser = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing required",
      User: [],
    });
  } else {
    let User = await userServices.GetAllUser(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "oke",
      User,
    });
  }
};

let CreateUser = async (req, res) => {
  let message = await userServices.CreateNewUser(req.body);
  return res.status(200).json(message);
};

let UpdateUser = async (req, res) => {
  let message = await userServices.UpdateNewUser(req.body);
  return res.status(200).json(message);
};

let DeleteUser = async (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "tai khoan khong ton tai",
    });
  }
  let message = await userServices.DeleteNewUser(id);
  return res.status(200).json({
    message,
  });
};

let getAllcode = async (req, res) => {
  try {
    let data = await userServices.getserALLcode(req.query.type);
    return res.status(200).json({
      data,
    });
  } catch (e) {
    console.log("lỗi all code", e);
    return res.status(200).json({
      error: -1,
      errMessage: "error form server",
    });
  }
};

module.exports = {
  handleLogin,
  getAllUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
  getAllcode,
};
