'use strict';

const express=require('express');
const router=express.Router();
// const app = express();
const oauth=require('../auth/middleware/OAuth');
const mainSchema = require('./models/users-model');
const basicAuth=require('./middleware/Basic');



router.post('/signup', async(req,res,next)=>{
  try{
    let users=new mainSchema(req.body);
    let result = await users.save();
    let token = mainSchema.generateToken(result);
    console.log('show token',token);
    res.status(200).send(token);
  } catch (e){
    next('we have your data');
  }
});

router.post('/signin',basicAuth,(req,res) => {
  console.log('show signin');

  res.status(200).json({'token':req.token,'user':req.data});
});

router.get('/users', async (req,res)=>{
  let users = await mainSchema.findAll();
  res.status(200).json({users});   
});

router.get('/oauth', oauth, (req, res) => {
  res.json({ token: req.token ,'user':req.user});
});

module.exports=router;









