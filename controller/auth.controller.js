const UserSchema = require("../schema/user.schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const User = await UserSchema.findOne({ email });
    if (User) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await UserSchema.create({ username, email, password: hashPassword });

    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "5d" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  register, 
  login 
};