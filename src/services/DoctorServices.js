import db from "../models/index";
import bcrypt from "bcryptjs";
import { assign } from "nodemailer/lib/shared";

const salt = bcrypt.genSaltSync(10);

let getTopDocTor = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctor = await db.User.findAll({
        limit: limit,
        where: { roleid: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcodes,
            as: "positionData",
            attributes: ["value_en", "value_vi"],
          },
          // {
          //   model: db.Allcodes,
          //   as: "genderData",
          //   attributes: ["value_en", "value_vi"],
          // },
        ],

        raw: true,
        nest: true,
      });
      // if (doctor && doctor.image) {
      //   doctor.image = Buffer(doctor.image, "base64").toString("binary");
      // }
      resolve({ errCode: 0, errMessage: "lấy thanh cong", doctor });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllDocTor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let Doctor = await db.User.findAll({
        where: { roleid: "R2" },
        attributes: {
          exclude: ["password"],
        },
      });
      resolve({
        errCode: 0,
        errMessage: "lấy thông tin bác sĩ thành công",
        Doctor,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let saveInfoDoctor = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId || !data.contentHTML || !data.contentMarkdown) {
        resolve({
          errCode: 1,
          errMessage: "missing parameter",
        });
      } else {
        await db.markdown.create({
          contentHTML: data.contentHTML,
          contentMarkdown: data.contentMarkdown,
          description: data.description,
          doctorId: data.doctorId,
        });
        resolve({
          errCode: 0,
          errMessage: "lưu thông tin bác sĩ thành công",
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let getInfoDoctor = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "missing parameter",
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: id,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.markdown,
              as: "DoctorData",
              attributes: ["contentHTML", "contentMarkdown", "description"],
            },
            {
              model: db.Allcodes,
              as: "positionData",
              attributes: ["value_en", "value_vi"],
            },
          ],
          raw: true,
          nest: true,
        });
        resolve({
          errCode: 0,
          errMessage: "lấy thông tin bác sĩ thành công",
          data,
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  getTopDocTor,
  getAllDocTor,
  saveInfoDoctor,
  getInfoDoctor,
};
