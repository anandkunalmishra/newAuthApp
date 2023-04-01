const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require("dotenv").config();
const app = express();
const User = require('./model/user');
require('./config/database').connect();

// Middlewares
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("<h1>This is an auth window</h1>");
});

app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Validation
    if (!(email && password && firstname && lastname)) {
      return res.status(400).send("All fields are mandatory");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).send("User already registered");
    }

    // Hashing password
    const myencPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: myencPassword,
    });

    // Create JWT token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );

    // Attach token to user object
    user.token = token;

    // Remove password field from user object
    user.password = undefined;

    // Return user object with token
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// Export app
module.exports = app;