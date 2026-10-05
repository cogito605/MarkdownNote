const prisma = require("../db/connect.js");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const privateKey = fs.readFileSync(path.join(__dirname, "../private.pem"));

async function register(req, res) {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "name, email, password and confirmPassword are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "passwords don't match",
      });
    }

    const existUser = await prisma.User.findUnique({
      where: {
        email,
      },
    });

    if (existUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.User.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        userId: newUser.id,
      },
      privateKey,
      {
        algorithm: "RS256",
        expiresIn: "15m",
      },
    );

    const { password: _, ...user } = newUser;

    return res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required",
      });
    }

    const existUser = await prisma.User.findUnique({
      where: {
        email,
      },
    });

    if (!existUser) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: existUser.id,
      },
      privateKey,
      {
        algorithm: "RS256",
        expiresIn: "15m",
      },
    );

    const { password: _, ...user } = existUser;

    return res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

module.exports = {
  register,
  login,
};
