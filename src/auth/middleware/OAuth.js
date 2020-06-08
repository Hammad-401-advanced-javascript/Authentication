'use strict';
require('dotenv').config();
const superagent = require('superagent');
const users=require('../models/users-model');

//this is come from the docs will be used to exchange the code for a token
const tokenServerUrl = 'https://github.com/login/oauth/access_token';
//this came from the docs and will be used to get the user by sending the token that we got from GH
const remoteAPI='https://api.github.com/user';

// .env
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_SERVER = process.env.API_SERVER;

module.exports=async(req,res,next)=>{

  try{
    // the code is coming back from the pop
    const code = req.query.code;
    // console.log('__THE CODE__', code);
    // this will call the function and will get back the Token from GH
    const remoteToken = await exchangeCodeForToken(code);
    // console.log('The TOKEN', remoteToken);
    // get the user object from GH by sending the token from GH
    const remoteUser=await getReomteUserInfo(remoteToken);
    // console.log('GITHUB USER', remoteUser);
    // sending the GH user and save it to db get back local user + token
    const[user,token]=await getUser(remoteUser);
    // console.log('LOCAL USER', user);
    req.user = user;
    req.token = token;

  }catch (err) {
    next(err.message);
  }


  // after the popup send the code to github for token
  async function exchangeCodeForToken(code){
    const tokenRespnse= await (await superagent.post(tokenServerUrl)).setEncoding({
      code:code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: API_SERVER,
      grant_type: 'authorization_code', //remove 
    });
    const access_token=tokenRespnse.body.access_token;
    return access_token;
  }

  // get the remote user from H by using the Token that come from GH
  async function getReomteUserInfo(token){
    const userResponse=await superagent 
      .get(remoteAPI)
      .set('Authorization',`toke${token}`)
      .set('user-agent','express-app');

    const user = userResponse.body;
    return user;
  }

  // save the uder to the db and return the user and our token
  async function getUser(remoteUser){
    const userRecord={
      username : remoteUser.login,
      password: 'anysting', // Math.random(1000), // this can be anything just because its required in the db
    };
    //   const user = await users.save(userRecord);
    //   const token = users.generateToken(user);
    //   return [user, token];
  }


};