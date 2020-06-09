'use strict';

const express=require('express');
const router=express.Router();

const mainSchema = require('./models/users-model');
const basicAuth=require('./middleware/Basic');



router.post('/signup', async(req,res,next)=>{
  try{
    let users=new mainSchema(req.body);
    let result = await users.save();
    let token = mainSchema.generateToken(result);
    // console.log('see the token',token)
    res.status(200).send(token);
  } catch (e){
    next('we dont have your data');
  }
});

router.post('/signin',basicAuth,(req,res) => {
  res.status(200).json({'token':req.token,'user':req.data});
});

router.get('/users', async (req,res)=>{
  let users = await mainSchema.findAll();
  res.status(200).json({users});   
});

module.exports=router;









