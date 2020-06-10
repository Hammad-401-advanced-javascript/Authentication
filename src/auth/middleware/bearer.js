'user strict';

const users = require('../models/users-model');

module.exports=(req,res,next)=>{
  if(!req.headers.authorization) {
    next ('invalid login no auth headers');
  }else{
    const[auth,token]=req.headers.authorization.split(' ');
    if(auth === 'Bearer'){
      console.log('Token',token);
      users
        .authenticateToken(token)
        .then((validUser)=>{
          req.user= validUser;
          next();
        })
        .catch((e)=> next ('Invalid login',e.message));
    }else{
      next('Invalid auth header');
    }
  }
};