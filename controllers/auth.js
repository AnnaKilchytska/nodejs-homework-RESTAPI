const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      res.status(409).json({ message: "This email is already in use!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
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

    await User.findByIdAndUpdate(user._id, token);

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

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
};
