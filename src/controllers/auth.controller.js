const { UserModel } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res) {
    console.log('lll')
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).send({
        message: "user not found",
      });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) { 
        res.status(400).send({
          message: "password is incorrect",
        });
      } else {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res.status(200).send({
          token: token
        })
      }

    }
  } catch (error) {
      res.status(400).send({message: error})
  }
}

module.exports = {
  login
}