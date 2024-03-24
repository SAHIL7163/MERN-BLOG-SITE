const User = require('../model/User') ;

const jwt = require('jsonwebtoken');

const handleRefreshToken = async(req,res) =>
{
    const cookies = req.cookies ;
    if(!cookies?.jwt)
    {    console.log("sahil");
        return res.sendStatus(401);
    } 
    const refreshToken = cookies.jwt ;

    const foundUser = await User.findOne({refreshToken}).exec();
    if(!foundUser) return res.sendStatus(403) ;  /// forbiddin

    jwt.verify(
        refreshToken ,
        process.env.REFRESH_TOKEN_SECRET ,
         (err,decoded) =>
         {
            if(err || foundUser.username !== decoded.username) 
            { console.log("Dhameja") 
            //console.log(foundUser.username);
            //console.log(decoded.username)
                return res.sendStatus(403);
         }
             
         const roles = Object.values(foundUser.roles).filter(Boolean);
            const accessToken = jwt.sign(
                {
                    "UserInfo" :
                    {     "username": decoded.username,
                            "roles": roles
                    
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            );

           res.json({accessToken,roles});
         } 
    )
}

module.exports = { handleRefreshToken }