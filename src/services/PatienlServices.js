import db from "../models/index";
import bcrypt from "bcryptjs";
require("dotenv").config();
import _ from "lodash";
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULES;
import emailServices from "./emailServices";
import { v4 as uuidv4 } from "uuid";

let builUrlEmail = (doctorid, token) => {
  let result = `${process.env.URL_FE}/verify_create-book?token=${token}&doctorid=${doctorid}`;
  return result;
};

let createBook = async (data) => {
  return new Promise(async (resolve, reject) => {
    console.log(data);
    try {
      if (
        !data.email ||
        !data.doctorid ||
        !data.date ||
        !data.timeType ||
        !data.phonenumber ||
        !data.firstName
      ) {
        resolve({
          errCode: 1,
          errMessage: "missing parameter",
        });
      } else {
        let token = uuidv4();
        await emailServices.sendEmail({
          receiverEmail: data.email,
          HoTen: data.firstName,
          date: data.formatDate,
          Name: data.name,
          last: data.last,
          redirectLink: builUrlEmail(data.doctorid, token),
        });

        let user = await db.User.findOrCreate({
          where: {
            email: data.email,
          },
          defaults: {
            email: data.email,
            roleid: "R3",
            phonenumber: data.phonenumber,
            firstName: data.firstName,
          },
        });
        //create a booking

        if (user && user[0]) {
          let a = await db.Booking.findOrCreate({
            where: {
              patientid: user[0].id,
            },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorid,
              patientid: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
            raw: true,
          });
        }

        resolve({
          errCode: 0,
          errMessage: "Thêm Lịch Khám thành công",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let createverifyBook = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorid) {
        resolve({
          errCode: 1,
          errMessage: "missing parameter",
        });
      } else {
        let dataBook = await db.Booking.findOne({
          where: {
            doctorId: data.doctorid,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (dataBook) {
          (dataBook.statusId = "S2"), await dataBook.save();
          resolve({
            errCode: 0,
            errMessage: "update status succeed",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "lịch hẹn được kích hoạt hoạc không tồn tại",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createBook,
  builUrlEmail,
  createverifyBook,
};
