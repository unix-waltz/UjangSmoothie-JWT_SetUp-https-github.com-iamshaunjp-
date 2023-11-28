const JWT = require('jsonwebtoken');
const userModel = require('./../Models/userModel')
const requireAuth = (req,res,next) =>{
const token = req.cookies.jwt;
if(token){
JWT.verify(token,'foryou',async (err,decodeToken)=>{
   if(err){
    console.log(err.message);
    res.redirect('/login');
   } else{
    console.log(decodeToken);
    next();
   }
})
}else{
    res.redirect('/login')
}
}
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
     JWT.verify(token, 'foryou', async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await userModel.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };
  
  
  module.exports = { requireAuth, checkUser };