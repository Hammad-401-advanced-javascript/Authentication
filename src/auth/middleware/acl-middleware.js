module.exports=(capability)=>{


  /**
 * I think of it a lot , tomorrow i will ask about writing it here,
 * if its not work, i will add route for every one [user,editor,admin]
 * and in each route i will make function deal with the capability.
 * 
 * also it may solve by typeOf
 */

  return (req,res,next)=>{
    try{
      if(req.user.capabilities.includes(capability)){
        next();
      } else {
        next('Access Denied');
      }
    } catch(e){
      next('invalid login');
    }
  };
};
