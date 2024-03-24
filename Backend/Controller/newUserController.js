const User = require('../model/User');

const bcrypt = require('bcrypt');

const handleNewUser = async(req,res)=>
{
   const {pwd , user} =req.body;
   if(!user || !pwd) return res.status(400).json({'message' : 'Username and password are required'});

   const duplicate = await User.findOne({ username: user }).exec();
   if (duplicate)
   {  
     return res.sendStatus(409);
   
   }//Conflict
 
try{
    const hashedpwd = await bcrypt.hash(pwd,10) ;

     const result = await User.create({
        "username" : user ,
        "password" : hashedpwd 
     }) ;

     console.log(result);

     res.status(201).json({'success': `New user ${user} created!`}) ;
}
catch(err)
{
    res.status(500).json({ 'message': err.message }); 
}

}


module.exports = { handleNewUser }; 
/* 
/* const userDB ={
    users :require('../model/users.json') ,
    setUsers :function(data)
    {
        this.users =data ;
    }
}
 */

/*  const User = require('../model/User');

const bcrypt =require('bcrypt');


const handleNewUser = async(req,res)=>
{
    const {pwd , user} =req.body;
    if(!user || !pwd) return res.status(400).json({'message' : 'Username and password are required'});


    //const duplicate = userDB.users.find(person => person.username ===user);
      // check for duplicate usernames in the db
      const duplicate = await User.findOne({ username: user }).exec();
      if (duplicate)
      {  
        return res.sendStatus(409);
      
      }//Conflict
     
    ///encrypt password
    try{
     const hashedpwd =  await bcrypt.hash(pwd,10);
    
    ///store the new user
    
    //   userDB.setUsers([...userDB.users , newUser]);
      //  await fsPromises.writeFile(path.join(__dirname , '..' ,'model' ,'users.json') , JSON.stringify(userDB.users)); 
    const result =await User.create({
      "username" : user ,
     "password" : hashedpwd 
    });
     
    console.log(result);

      res.status(201).json({'success': `New user ${user} created!`});
    }
    catch(err)
    {
      res.status(500).json({ 'message': err.message });
    }
}


module.exports = { handleNewUser };  */