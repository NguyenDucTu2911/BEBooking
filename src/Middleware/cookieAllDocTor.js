import jwt from "jsonwebtoken";
import user from "../models/user";

export const cookieLogin = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("no token found");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, email) => {
    if (err) {
      return res.status(405).json("invalid token");
    }
    req.user = {
      email: email,
    };
    next();
  });
};
