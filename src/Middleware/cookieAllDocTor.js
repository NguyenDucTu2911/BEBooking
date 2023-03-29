import jwt from "jsonwebtoken";

exports.cookieAllDoctor = (req, res) => {
  const token = req.cookies.token;
  try {
    const allDoctor = jwt.verify(token, process.env.JWT_SECRET);
    req.allDoctor = allDoctor;
    next();
  } catch (error) {
    res.clearCookies("token");
    return res.redirect(req.url);
  }
};
