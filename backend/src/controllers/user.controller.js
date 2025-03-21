const User = require("../models/user.model");

const getUsers = async (req, res) => {
  try {
    res.json({ users: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAddressUser = async (req, res) => {
  const { address } = req.body;
  console.log(address);
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.address = address;
    await user.save();
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  updateAddressUser,
  deleteUser,
};
