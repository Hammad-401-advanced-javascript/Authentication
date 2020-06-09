const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config;

const SECRET = process.env.SECRET || 'mysecret';

 

const Auth=mongoose.Schema({
  username:{type:String,require:true},
  password:{type:Number,require:true},
 
});




Auth.statics.authenticate=function(username, pass){
  return this.find({ username })
    .then(user =>{
      let returnValue = bcrypt.compare(pass,user[0].password) ? user[0] :null;
      console.log('bcrypt.user[0].password',bcrypt.compare(pass,user[0].password) ? user[0] :null);
      return returnValue;
    });
};

Auth.statics.generateToken = function (user) {
  let token = jwt.sign({ username: user.username }, process.env.SECRET,{expiresIn:60*15});
  return token;
};

Auth.statics.findAll= async function(){
  return await this.find({});
};

Auth.statics.findTheUser=async function(username){
  return await this.find({username});
};

Auth.statics.authenticateToken=async function(token,name){
  try{
    const tokenObject= await jwt.verify(token,SECRET);
    if(name.username){
      return Promise.resolve(tokenObject);
    } else{
      return Promise.reject('user is not found');
    }
  }catch (e) {
    return Promise.reject(e.message);
  }
};

module.exports = mongoose.model('Auth',Auth);




