import { json } from "body-parser";
import db from "../models/index";

let login = async (req, res) => {
  return res.status(200).json({
    mess: "hello",
  });
};

module.exports = {
  login,
};
