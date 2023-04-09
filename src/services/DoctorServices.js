import db from "../models/index";
import bcrypt from "bcryptjs";
require("dotenv").config();
import _ from "lodash";
import emailServices from "./emailServices";

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULES;
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
      if (
        !data.doctorId ||
        !data.contentHTML ||
        !data.contentMarkdown ||
        !data.action ||
        !data.priceId ||
        !data.paymentId ||
        !data.provinceId ||
        !data.nameClinic ||
        !data.addressClinic ||
        !data.note
      ) {
        resolve({
          errCode: 1,
          errMessage: "missing parameter",
        });
      } else {
        //upset markdown
        if (data.action === "CREATE") {
          await db.markdown.create({
            contentHTML: data.contentHTML,
            contentMarkdown: data.contentMarkdown,
            description: data.description,
            doctorId: data.doctorId,
          });
        } else if (data.action === "EDIT") {
          let doctorMark = await db.markdown.findOne({
            where: {
              doctorId: data.doctorId,
            },
            raw: false,
          });
          console.log(doctorMark);
          if (doctorMark) {
            console.log(data.action);

            doctorMark.contentHTML = data.contentHTML;

            doctorMark.contentMarkdown = data.contentMarkdown;
            doctorMark.description = data.description;
            await doctorMark.save();
          }
        }
        // upsetDoctor-info
        let Doctor = await db.doctorInfo.findOne({
          where: {
            doctorId: data.doctorId,
          },
          raw: false,
        });
        if (Doctor) {
          Doctor.doctorId = data.doctorId;
          Doctor.priceId = data.priceId;
          Doctor.paymentId = data.paymentId;
          Doctor.provinceId = data.provinceId;
          Doctor.nameClinic = data.nameClinic;
          Doctor.addressClinic = data.addressClinic;
          Doctor.note = data.note;
          let a = await Doctor.save();
          console.log(a);
        } else {
          let a = await db.doctorInfo.create({
            doctorId: data.doctorId,
            priceId: data.priceId,
            provinceId: data.provinceId,
            paymentId: data.paymentId,
            nameClinic: data.nameClinic,
            addressClinic: data.addressClinic,
            note: data.note,
          });
          console.log(a);
        }
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
              model: db.Allcodes,
              as: "positionData",
              attributes: ["value_en", "value_vi"],
            },
            {
              model: db.markdown,
              as: "DoctorData",
              attributes: ["contentHTML", "contentMarkdown", "description"],
            },
            {
              model: db.doctorInfo,
              as: "DoctorInfoData",
              attributes: {
                exclude: ["doctorId", "id"],
              },
              include: [
                {
                  model: db.Allcodes,
                  as: "timeTypePriceId",
                  attributes: ["value_en", "value_vi"],
                  attributes: {
                    exclude: ["id"],
                  },
                },
                {
                  model: db.Allcodes,
                  as: "timeTypeProvinceId",
                  attributes: ["value_en", "value_vi"],
                  attributes: {
                    exclude: ["id"],
                  },
                },
                {
                  model: db.Allcodes,
                  as: "timeTypePaymentId",
                  attributes: ["value_en", "value_vi"],
                  attributes: {
                    exclude: ["id"],
                  },
                },
              ],
            },
          ],

          raw: true,
          nest: true,
        });
        if (data.image) {
          data.image = Buffer(data.image, "base64").toString("binary");
        }

        if (!data) data = {};
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

let createSchedules = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.Schedules || !data.doctorid || !data.date) {
        resolve({
          errCode: 1,
          errMessage: "missing parameter",
        });
      } else {
        let Schedules = data.Schedules;
        if (Schedules && Schedules.length > 0) {
          Schedules.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
        }
        // await db.Schedule.bulkCreate(Schedules);

        //get all existing data
        let existing = await db.Schedule.findAll({
          where: {
            doctorid: data.doctorid,
            date: data.date,
          },
          attributes: ["timeType", "date", "doctorid", "maxNumber"],
          raw: true,
        });

        //convert date
        // if (existing && existing.length > 0) {
        //   existing.map((item) => {
        //     item.date = new Date(item.date).getTime();
        //     return item;
        //   });
        // }

        //compare different
        let toCreate = _.differenceWith(Schedules, existing, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        });

        //create a date
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }
        resolve({
          errCode: 0,
          errMessage: "lưu lịch khám bác sĩ thành công",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let GetSchedule = (doctorid, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorid || !date) {
        resolve({
          errCode: 1,
          errMessage: "missing parameter ",
        });
      } else {
        let data = await db.Schedule.findAll({
          where: {
            doctorid: doctorid,
            date: date,
          },
          include: [
            {
              model: db.Allcodes,
              as: "timeTypeData",
              attributes: ["value_en", "value_vi"],
            },
            {
              model: db.User,
              as: "ScheduleData",
              attributes: ["firstName", "lastName"],
            },
          ],
          raw: true,
          nest: true,
        });
        if (!data) data = [];
        resolve({
          errCode: 0,
          errMessage: "lây thành công",
          data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getExtraInfo = (doctorid) => {
  console.log(doctorid);
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorid) {
        resolve({
          errCode: 1,
          errMessage: "missing parameter",
        });
      } else {
        let data = await db.doctorInfo.findOne({
          where: {
            doctorId: doctorid,
          },
          include: [
            {
              model: db.Allcodes,
              as: "timeTypePriceId",
              attributes: ["value_en", "value_vi"],
              attributes: {
                exclude: ["id"],
              },
            },
            {
              model: db.Allcodes,
              as: "timeTypeProvinceId",
              attributes: ["value_en", "value_vi"],
              attributes: {
                exclude: ["id"],
              },
            },
            {
              model: db.Allcodes,
              as: "timeTypePaymentId",
              attributes: ["value_en", "value_vi"],
              attributes: {
                exclude: ["id"],
              },
            },
          ],
          raw: true,
          nest: true,
        });
        if (!data) data = [];
        resolve({
          errCode: 0,
          errMessage: "lây thành công",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getBooking = (doctorid) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorid) {
        resolve({
          errCode: 1,
          errMessage: "missing parameter",
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: doctorid,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Allcodes,
              as: "positionData",
              attributes: ["value_en", "value_vi"],
            },
            {
              model: db.markdown,
              as: "DoctorData",
              attributes: ["description"],
            },

            {
              model: db.doctorInfo,
              as: "DoctorInfoData",
              attributes: {
                exclude: ["doctorId", "id"],
              },
              include: [
                {
                  model: db.Allcodes,
                  as: "timeTypePriceId",
                  attributes: ["value_en", "value_vi"],
                  attributes: {
                    exclude: ["id"],
                  },
                },
                {
                  model: db.Allcodes,
                  as: "timeTypeProvinceId",
                  attributes: ["value_en", "value_vi"],
                  attributes: {
                    exclude: ["id"],
                  },
                },
                {
                  model: db.Allcodes,
                  as: "timeTypePaymentId",
                  attributes: ["value_en", "value_vi"],
                  attributes: {
                    exclude: ["id"],
                  },
                },
              ],
            },
          ],

          raw: false,
          nest: true,
        });
        if (data.image) {
          data.image = Buffer(data.image, "base64").toString("binary");
        }

        if (!data) data = {};
        resolve({
          errCode: 0,
          errMessage: "lấy thông tin bác sĩ thành công",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllBooking = (doctorid, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorid || !date) {
        resolve({
          errCode: 1,
          errMessage: "missing parameter",
        });
      }
      let data = await db.Booking.findAll({
        where: {
          doctorId: doctorid,
          statusId: "S2",
          date: date,
        },
        attributes: {
          exclude: ["token", "createdAt", "updatedAt", "id"],
        },
        include: [
          {
            model: db.User,
            as: "BookingData",
            attributes: ["firstName", "email"],
          },
          {
            model: db.User,
            as: "BookingNameData",
            attributes: ["firstName", "lastName"],
          },
          {
            model: db.Allcodes,
            as: "timeTypeBooking",
            attributes: ["value_en", "value_vi"],
          },
        ],

        raw: false,
        nest: true,
      });
      resolve({
        data,
        errCode: 0,
        errMessage: "Thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let sendRemedy = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorId || !data.timeType || !data.patientid) {
        resolve({
          errCode: 1,
          errMessage: "missing parameter",
        });
      } else {
        let appoinment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            patientid: data.patientid,
            timeType: data.timeType,
            statusId: "S2",
          },
          raw: false,
        });
        if (appoinment) {
          (appoinment.statusId = "S3"), await appoinment.save();
        }
        await emailServices.sendCheck(data);
        resolve({
          errCode: 0,
          errMessage: "Thêm Thành công",
        });
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

module.exports = {
  getTopDocTor,
  getAllDocTor,
  saveInfoDoctor,
  getInfoDoctor,
  createSchedules,
  GetSchedule,
  getExtraInfo,
  getBooking,
  getAllBooking,
  sendRemedy,
};
