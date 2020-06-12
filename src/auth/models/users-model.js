/* eslint-disable valid-typeof */
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config;

const SECRET = process.env.SECRET || 'mysecret';

const Auth=mongoose.Schema({
  username:{type:String,require:true},
  password:{type:Number,require:true},
  role:{type:String,
    require:true,
    default:'user',
    num:['user','editor','admin'],
  },
});




let roles = {
  user: ['read'],
  editor: ['read', 'create', 'update'],
  admin: ['read', 'create', 'update', 'delete'],
};
 

Auth.statics.authenticate=function(username, pass){
  return this.find({ username })
    .then(user =>{
      let returnValue = bcrypt.compare(pass,user[0].password) ? user[0] :null;
      return returnValue;
    });
};

Auth.statics.generateToken = function (user) {
  let userData={username: user.username,  roles:user.role };
  let token = jwt.sign(userData,process.env.SECRET,{expiresIn:60*15});
  return token;
};

Auth.statics.findAll= async function(){
  return await this.find({});
};

Auth.statics.findTheUser=async function(username){
  return await this.find({username});
};

Auth.statics.authenticateToken=async function(token){
  try{
    const tokenObject= await jwt.verify(token,SECRET);
    // if(name.username){
    return Promise.resolve(tokenObject);
    // } else {
    // return Promise.reject('user is not found');
    // }
  }catch (e) {
    return Promise.reject(e.message);
  }
};


Auth.statics.can = async function(permission){
  try {
    let check=permission.role.num;
    if(typeof check =='user'){
      return roles.user;
    } else if (typeof check =='editor'){
      return roles.editor;

    }else if ( typeof check =='admin'){
      return roles.admin;

    }
  }catch (e) {
    return Promise.reject(e.message);
  }
};
module.exports = mongoose.model('Auth',Auth);




