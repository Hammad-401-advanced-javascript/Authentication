'use strict';
function errorHandler(err, req, res, next) {
  res.status(500);
  res.json({err: err,status: '500'});
}
  
module.exports = errorHandler;