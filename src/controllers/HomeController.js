import { json } from "body-parser";
import db from "../models/index";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

let login = async (res, req) =>{

}

module.exports = {
  getHomePage,login
};
