'use strict';

const router=require('./auth/router');
const bearerMiddleware=require('./auth/middleware/bearer');


router.get('/secret', bearerMiddleware, (req,res) => {
  res.status(200).send('plz save me in a good way');
} );

module.exports=router;