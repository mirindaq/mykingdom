const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    res.status(200).json({ message: "Login successful" }); // Thêm response cho login thành công
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