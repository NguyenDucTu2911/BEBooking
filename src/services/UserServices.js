import { reject, resolve } from "promise";
import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExit = await checkUser(email);
      if (isExit) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["lastName", "firstName", "password", "roleid"],
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          console.log(check);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Đang nhập thành công";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "sai mật khẩu";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "sai tài khoản";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `sai tài khoản`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUser = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let TaiKhoanNV = await db.User.findOne({
        where: { email: email },
      });
      if (TaiKhoanNV) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let GetAllUser = (userid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = "";
      if (userid === "ALL") {
        user = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
        console.log(user);
      }
      if (userid && userid !== "ALL") {
        user = await db.User.findOne({
          where: { id: userid },
          attributes: {
            exclude: ["password"],
          },
        });
      }

      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  GetAllUser,
};
