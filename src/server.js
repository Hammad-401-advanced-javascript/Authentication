'use strict';

const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const notFound=require('./middleeware/404');
const serverErr=require('./middleeware/500');
const extra=require('./extra-routes');
const router=require('./auth/router');
const usersModel = require('./auth/models/users-model');


router.get('/', (req,res)=>{
  usersModel.get().then((data)=>res.json(data));
});

const app=express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use(express.static('./public'));


app.use('/secret',extra);


app.use(router);

app.use(notFound);
app.use(serverErr);

module.exports={
  server:app,
  start:(port)=>{
    const PORT = port ||process.env.PORT||300;
    app.listen(PORT,()=>console.log(`listining on ${PORT}`));
  },
};