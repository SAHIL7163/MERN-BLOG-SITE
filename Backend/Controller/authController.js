const User = require('../model/User') ;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async(req,res) =>
{
    const {user,pwd} = req.body ;
    if(!user || !pwd)  return res.status(400).json({'message' : 'Username and password are required'}) ;

    const foundUser = await User.findOne({username : user}).exec();
    if(!foundUser)
    {
       return res.sendStatus(401);
    } ///unauthorized

    const match = await bcrypt.compare(pwd,foundUser.password) ;
    if(match)
    {   
        const roles = Object.values(foundUser.roles).filter(Boolean) ;
        const accessToken = jwt.sign(
            {
              "UserInfo": {
                  "username": foundUser.username,
                  "roles": roles
              }
          },
            process.env.ACCESS_TOKEN_SECRET ,
            {expiresIn : '1h'}
          )
        
          const refreshToken =jwt.sign(
            {"username" : foundUser.username},
            process.env.REFRESH_TOKEN_SECRET ,
            {expiresIn : '1d'}
          )
        
        foundUser.refreshToken = refreshToken ;
        const result = await foundUser.save();
        console.log(result);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt' , refreshToken ,{ httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
        //res.cookies('jwt',refreshToken ,{ httpOnly : true,sameSite: 'None', maxAge : 24*60*60*10000})

        // Send authorization roles and access token to user
        res.json({accessToken,roles});
    }
    else {
       res.sendStatus(401);
    }
}


module.exports = { handleLogin };