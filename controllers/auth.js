const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");

const { User } = require("../models/user");
const HttpError = require("../helpers/HTTPError");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      // res.status(409).json({ message: "This email is already in use!" });
      throw HttpError(409, { message: "This email is already in use!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    console.log(avatarURL);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
    });

    res.status(201).json({
      email: newUser.email,
      password: newUser.password,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Email or password invalid" });
    }

    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!comparedPassword) {
      res.status(401).json({ message: "Email or password incorrect" });
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    console.log(user._id);

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          email,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Email or password incorrect" });
  }
};

const logout = async (req, res) => {
  try {
    const { id } = req.user;
    await User.findByIdAndUpdate(id, { token: "" });

    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const { email, name } = req.user;

    res.json({
      email,
      name,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  getAvatar,
};
