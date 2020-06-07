const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config;

const SECRET = process.env.SECRET || 'mysecret';

 

const Auth=mongoose.Schema({
  username:{type:String,require:true},
  password:{type:Number,require:true},
 
});




Auth.authenticateBasic = async function (user, pass) {
  const valid = await bcrypt.compare(pass, Auth[user].password);
  return valid ? Auth[user] : Promise.reject('wrong password');
};

Auth.generateToken = function (user) {
  const token = jwt.sign({ username: user.username }, SECRET);
  return token;
};

Auth.findAll= async function(){
  return await this.find({});
};
  
module.exports = mongoose.model('Auth',Auth);




