
function notFoundHandler(req, res, next) {
  res.status(404);res.send({err: 'not found',status: '404'});
}
  
module.exports = notFoundHandler;
  
  