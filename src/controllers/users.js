const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = require("../models/users.js");
// app.use(express.json())

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Register = async (req, res) => {
  const { email, password, username, phone, address, age } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  if (!emailRegex.test(email))
    return res.status(401).json({ message: "enter valid email" });
  if (!passwordRegex.test(password))
    return res.status(401).json({ message: "enter valid password" });
  try {
    const existUser = await user.findOne({ $or: [{ email }, { username }] });
    if (existUser) {
      return res.status(409).send("user already exist");
    }
    const newUser = new user({
      email,
      password,
      username,
      phone,
      address,
      age,
    });
    await newUser.save();

    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res.status(200).json({ message: "user registered successfully" });
  } catch (err) {
    console.log(err);
    if (!res.headersSent) res.status(500).send("User not Added");
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  const users = await user.findOne({ email });
  if (!users) return res.status(401).json("user not added");
  const isValid = await bcrypt.compare(password, users.password);

  if (!isValid) return res.status(401).send("password invalid");
  //   const response=users.findOne().select("-password");

  const token = jwt.sign(
    { id: users._id, email: users.email },
    process.env.JWT_SECRET
  );

  const { password: _, ...userWithoutPassword } = users.toObject();

  res.status(200).json({ userdetails: userWithoutPassword, token });
};

const userDetails = async (req, res) => {
  const userId = req.params.id;

  try {
    if (!req.user) return res.status(404).json({ message: "user not found" });

    const id = req.user._id.toString();

    if (userId !== id) {
      return res.status(403).json({ message: "authentication failed" });
    }
    const User = await user.findById(userId).select("-password");

    if (!User) return res.status(404).json({ message: "user not found" });

    // const userObject = User.toObject();

    // const { password: _, ...userWithoutPassword } = userObject;

    res.status(200).json({ user: User });
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
};

const Update = async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;
  const users = req.user;

  try {
    if (!users) return res.status(404).json({ message: "user not found" });

    if (userId !== users._id.toString())
      return res.status(500).json({ message: "authentication failed" });

    if (updates.email && !emailRegex.test(updates.email))
      return res.status(401).json({ message: "update valid email" });

    if (updates.password && !passwordRegex.test(updates.password))
      return res.status(401).json({ message: "update valid password" });

    // const existingUser = await user.findById(userId);
    // if (!existingUser)
    //   return res.status(404).json({ message: "User not found" });

    if (updates.password) {
      const saltround = 10;
      updates.password = await bcrypt.hash(updates.password, saltround);
    }
    await user.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    const updatedKeys = Object.keys(updates);

    const messages = updatedKeys.map((key) => {
      return `${
        key.charAt(0).toUpperCase() + key.slice(1)
      } updated successfully`;
    });

    res.status(200).json({ messages });
  } catch (err) {
    console.log(err);
  }
};

const Delete = async (req, res) => {
  const userId = req.params.id;
  const users = req.user;

  try {
    if (!users) return res.status(404).json({ message: "user not found" });

    if (userId !== users._id.toString())
      return res.status(500).json({ message: "Authentication Failed" });

    // const existingUser = await user.findById(userId);
    // if (!existingUser)
    //   return res.status(404).json({ message: "User not found" });

    await user.findByIdAndDelete(userId);
    res.status(200).send("user Deleted successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  Register,
  Login,
  userDetails,
  Update,
  Delete,
};
