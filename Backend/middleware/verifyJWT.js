const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log('authHeader:', authHeader);

    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}
module.exports = verifyJWT

/*const jwt=require('jsonwebtoken');
require('dotenv').config();


const verifyJWT= async(req ,res,next)=>
{
  const authHeader = req.headers['authorization'];
  if(!authHeader) res.sendStatus(401);
    console.log(authHeader);

    const token =authHeader.split(' ')[1];
    jwt.verify(
        token ,
        process.env.ACCESS_TOKEN_SECRET ,
        (err ,decoded) =>
        {
            if(err) return res.sendStatus(403); ///invalid token

            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next(); 
        }
    )
}

module.exports = verifyJWT ;  
 */
