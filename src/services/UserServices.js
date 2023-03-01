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

let hashPasswords = (Password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hash(Password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let CreateNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUser(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "tai khoan da ton tai",
        });
      } else {
        let hashpassword = await hashPasswords(data.password);
        await db.User.create({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          address: data.address,
          gender: data.gender-- - "1" ? true : false,
          roleid: data.roleid,
          password: hashpassword,
        });
        resolve({
          errCode: 0,
          errMessage: "them thanh cong",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let UpdateNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "không thấy thông tin tai khoan",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        (user.firstName = data.firstName),
          (user.lastName = data.lastName),
          (user.email = data.email),
          (user.address = data.address),
          (user.gender = data.gender),
          (user.roleid = data.roleid);

        await user.save();
        resolve({
          errCode: 0,
          errMessage: "Thay doi thong tin thanh cong",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "sua thong tin that bai",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let DeleteNewUser = async (Userid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: Userid },
        raw: false,
      });
      if (!user) {
        resolve({
          errCode: 1,
          errMessage: "tai khoan khong ton tai",
        });
      }
      await user.destroy();
      resolve({
        errCode: 0,
        errMessage: "xoa tai khoan thanh cong",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  GetAllUser,
  CreateNewUser,
  UpdateNewUser,
  DeleteNewUser,
};
