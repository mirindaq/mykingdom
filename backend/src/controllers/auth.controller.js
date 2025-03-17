const User = require("../models/user.model");

const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = new User();
    user.role = "user";
    user.createdAt = new Date();
    user.phone = phone;
    user.name = name;
    user.email = email;
    user.password = password;

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to register", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const authUser = await User.findOne({ email });
    if (!authUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = password === authUser.password;
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ user: authUser });
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

const getProfile = async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
