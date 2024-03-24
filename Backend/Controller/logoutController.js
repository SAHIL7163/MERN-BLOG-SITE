const User = require('../model/User');
const Jwt = require('jsonwebtoken')

const handlelogOut = async(req,res) =>
{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204) ;
    const refreshToken = cookies.jwt ;
    
    const foundUser = await User.findOne({refreshToken}).exec();
    if(!foundUser) 
    {  res.clearCookie('jwt' ,{httpOnly : true, maxAge : 24*60*60*10000});
      return res.sendStatus(204);
     }  
     
     foundUser.refreshToken = '';
     const result = await foundUser.save();
     console.log(result);
  
     res.clearCookie('jwt' ,{httpOnly : true, maxAge : 24*60*60*10000});
    res.sendStatus(204);
  
}

module.exports = {handlelogOut}