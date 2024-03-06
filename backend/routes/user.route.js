const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
require("dotenv").config();
var jwt = require("jsonwebtoken");
//Signup
userRouter.post("/sign", async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  if (!email.includes("@") || password.length <= 8) {
    return res.status(400).json({ msg: "Invalid email or password" });
  }
  try {
    bcrypt.genSalt(4, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        let newUser = new userModel({
          name,
          email,
          password: hash,
          phoneNumber,
        });
        await newUser.save();
        res.status(200).send({ msg: "SignUp Successfull", newUser });
      });
    });
  } catch (err) {
    res
      .status(400)
      .send({ msg: err, Description: "Enable to post request in users" });
  }
});

//login to verify

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email) {
    let data = await userModel.findOne({ email });

    bcrypt.compare(password, data.password).then(function (result) {
      if (result) {
        const token = jwt.sign({ email }, process.env.Secret_key);

        res.send({ msg: "Token Generated", token: token });
      } else {
        res.status(401).send({ msg: "Tere Password mai locha hai mamu" });
      }
    });
  }
  try {
  } catch (err) {
    res.status(400).send({ msg: err, Description: "Enable to post Request" });
  }
});

module.exports = { userRouter };
