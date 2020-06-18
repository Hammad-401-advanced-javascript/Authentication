const schema = require('../models/users-model');

module.exports = (capability) => {



  return (req, res, next) => {
    try {
      if (schema.authenticateRole(req, capability)) {

        next();
      }

      else {
        next('Access Denied');
      }
    } catch (e) {
      next('invalid login');
    }
  };
};
