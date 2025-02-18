const User = require("../../models/User");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    const saltRounds = 10;
    req.body.password = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create(req.body);

    const payload = {
      _id: newUser._id,
      username: newUser.username,
      exp: Date.now() + process.env.JWT_EXPIRATION_MS,
    };

    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
