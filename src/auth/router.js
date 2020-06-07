'use strict';

const express=require('express');
const router=express.Router();

const mainSchema = require('./models/users-model');
const basicAuth=require('./middleware/Basic');



router.post('./signup', async(req,res,next)=>{
  try{
    let users=new mainSchema(req.body);
    let result = await users.save();
    let token = mainSchema.geneToken(result);
    res.status(200).send(token);
  } catch (e){
    next('we have your data');
  }
});

router.post('/signin',basicAuth,(req,res) => {
  res.status(200).json({'token':req.token,'user':req.data});
});









