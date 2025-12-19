const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "Bu email allaqachon ro'yxatdan o'tgan" });
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

    return res.json({
      message: "OK",
      data: newUser,
    });
  } catch (error) {
    return res.json({ message: "Server xatoligi", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Email yoki parol noto'g'ri" });
    }

    if (user.password !== password) {
      return res.json({ message: "Email yoki parol noto'g'ri" });
    }

    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    return res.json({
      message: "OK",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    return res.json({ message: "Server xatoligi", error: error.message });
  }
};

module.exports = { register, login };
