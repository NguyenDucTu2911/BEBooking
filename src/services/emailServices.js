require("dotenv").config();
import nodemailer from "nodemailer";

let sendEmail = async (datasend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAIL_APP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Lịch khám 👻" <ductu7890@gmail.com>',
    to: datasend.receiverEmail,
    subject: "Thông Tin Khám",
    html: `
    <h3>xin chào ${datasend.HoTen} </h3>
    <p>Bạn Đã Đặt lịch khám Thành Công</p>
    <p>Thông Tin Đặt Lịch Khám Bệnh</p>
    <p>Bác Sĩ: ${datasend.Name} ${datasend.last}</p>
    <p>Thời Gian: ${datasend.date}</p>
    <div>
    Vui lòng xác nhận lịch khám
    <a href=${datasend.redirectLink} target="black">Click here</a>
    </div>
    `,
  });
};

module.exports = {
  sendEmail: sendEmail,
};
