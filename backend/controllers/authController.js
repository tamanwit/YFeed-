const User = require("../models/UserModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const cookieOptions = {
  httpOnly: true, // Prevents XSS attacks from reading the cookie
  secure: process.env.NODE_ENV === "production", // HTTPS only in production
  sameSite: "strict", // Protects against CSRF attacks
  maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
};

const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Validation
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        message: "All fields are compulsory",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Check username
    const usernameExist = await User.findOne({ username });

    if (usernameExist) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    // Check email
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // Hash password
    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
    });

    // Create user
    const user = await User.create({
      name,
      username,
      email,
      password: passwordHash,
    });

    const userResponse = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    };

    return res.status(201).json(userResponse);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // contains user information for profile purposes
    const payload = {
      id: user._id,
      username: user.username,
    };
    // token signature
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const userResponse = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    };

    return res.status(200).cookie("token", token, cookieOptions).json({
      message: "Login successful",
      user: userResponse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { registerUser, loginUser };
