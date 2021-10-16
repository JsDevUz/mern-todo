const { UserModel } = require("../models/user.model");
const bcrypt = require("bcryptjs");

async function checkUser(id){
    const user = await UserModel.findOne({_id:id})
    return user
}

async function createUser(req, res) {
  const { email, fullName, password } = req.body;
  const isExists = await UserModel.findOne({ email: email });
  if (isExists) {
    res.send({ message: "email is already exist" });
  } else {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT)
    );
    const newUser = new UserModel({
      email,
      fullName,
      password: hashedPassword,
    //   todos,
    });
    try {
      await newUser.save();
      res.send({ message: "user has been created" });
    } catch (error) {
      throw error;
    }
  }
}

async function getUsers(req, res) {
  try {
    const users = await UserModel.find()
    // .populate("todos");
    if(users.length > 0) res.send(users);
    else res.send('users list is empty')
    
  } catch (error) {
    throw error;
  }
}
async function getUser(req, res) {
    const {id} = req.params
  try {
    const isUser = await checkUser(id)
    if(isUser){
        const user = await UserModel.find({_id:id})
    res.send(user);
    }else{
        res.send({message: 'user not found'})
    }
    
  } catch (error) {
    throw error;
  }
}
async function updateUser(req, res) {
    const {id} = req.params
    const {fullName,email,password} = req.body
    const hashedPassword = await bcrypt.hash(
        password,
        Number(process.env.SALT)
      );
  try { 
    const isUser = await checkUser(id)
    if(isUser){
        await UserModel.findByIdAndUpdate(id,{fullName,email,hashedPassword})
        res.send({message: 'User has been updated'});
    }else{
        res.send({message: 'user not found'})
    }
    
  } catch (error) {
    throw error;
  }
}
async function deleteUser(req, res) { 
    const {id} = req.params
  try {
      const isUser = await checkUser(id)
      if(isUser){
        const user = await UserModel.findByIdAndDelete(id)
        res.send({message: 'User has been deleted'});
      }else{
          res.send({message: 'user not found'})
      }
    
  } catch (error) {
    throw error;
  }
}

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser };
