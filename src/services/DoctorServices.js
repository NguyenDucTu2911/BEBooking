import db from "../models/index";
import bcrypt from "bcryptjs";
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
        // include: [
        //   {
        //     model: db.Allcodes,
        //     as: "positionData",
        //     attributes: ["value_en", "value_vi"],
        //   },
        //   {
        //     model: db.Allcodes,
        //     as: "genderData",
        //     attributes: ["value_en", "value_vi"],
        //   },
        // ],

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

module.exports = {
  getTopDocTor,
};
