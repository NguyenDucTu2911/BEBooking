import { resolve } from "promise";
import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (TaiKhoan, MatKhau) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExit = await checkUser(TaiKhoan);
      if (isExit) {
        let user = await db.NhanVien.findOne({
          where: { TaiKhoan: TaiKhoan },
          attributes: ["TaiKhoan", "Quyen", "HoTen", "MatKhau"],
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(MatKhau, user.MatKhau);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Đang nhập thành công";
            delete user.MatKhau;
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

let checkUser = (firstName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let TaiKhoanNV = await db.User.findOne({
        where: { firstName: firstName },
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
