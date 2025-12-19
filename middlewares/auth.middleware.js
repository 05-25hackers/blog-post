const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
const checkToken = (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({
        message: "Token mavjud emas",
      });
    }

    token = token.split(" ")[1];
    let data = jwt.verify(token, SECRET_KEY);
    req.user = data;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Avtorizatsiyadan o'tilmagan" });
  }
};

module.exports = {
  checkToken,
};
