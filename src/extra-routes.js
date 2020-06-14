'use strict';

const express=require('express');
const app = express();
const bearerAuth=require('./auth/middleware/bearer');
const acl=require('./auth/middleware/acl-middleware');

const router=require('./auth/router');


router.get('/secret', bearerAuth, (req,res) => {
  res.status(200).send('plz save me in a good way');
} );


app.get('/read',bearerAuth,acl('read'),(req,res)=>{
  res.status(200).send('you did the read part');
});

app.post('/add',bearerAuth,acl('create'),(req,res)=>{
  res.status(200).send('you did the create part');
});

app.put('/update',bearerAuth,acl('update'),(req,res)=>{
  res.status(200).send('you did the update part');
});

app.delete('/delete',bearerAuth,acl('delete'),(req,res)=>{
  res.status(200).send('you did the delete part');
});


module.exports=router;