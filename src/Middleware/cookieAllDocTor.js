import jwt from "jsonwebtoken";

export const cookieLogin = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
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

export const createToken = (req, res) => {
  return jwt.sign(
    { email: req.email, password: req.password },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
