
require('dotenv').config();

const express =require('express');
const app =express();
const  cors =require('cors');
const corseOptions=require('./config/corsOptions')
const  {Logger}=require('./middleware/logevent');
const  errorhandler=require('./middleware/errorhandler');
const verifyJWT =require('./middleware/verifyJWT');
const cookieParser =require('cookie-parser');
const credentials = require('./middleware/credentials');
const path=require('path');
const mongoose = require('mongoose');
const connectDB =require('./config/dbConn')
const PORT = process.env.PORT || 3500 ;


//Connect to MongoDB
connectDB();


///custom middleware
app.use(Logger);


//Handle options credentials check-brfore cors
//and fetch cookies credentials requirement
app.use(credentials);


///cross access
app.use(cors(corseOptions));

//built
app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use(cookieParser());

app.get('^/$|/index(.html)?',(req,res)=>
{
 //  res.sendFile('./views/index.html',{ root:__dirname });
     res.sendFile(path.join(__dirname ,'views','index.html'));
});
app.get('/new-page(.html)?',(req,res)=>
{
   res.sendFile(path.join(__dirname ,'views','new-page.html'));
})
app.get('/old-page(.html)?',(req,res)=>
{ 
    res.redirect(301,'/new-page.html');  //302 by default

}) 
 


/* app.use('/' , express.static(path.join(__dirname,'public')));
app.use('/subdir',express.static(path.join(__dirname,'public')));
app.use('/employee' , express.static(path.join(__dirname,'public'))); */
app.use('/public' , express.static(path.join(__dirname,'public')));


 app.use('/' ,require('./router/root'));
 app.use('/subdir',require('./router/subdir'));
 app.use('/register',require('./router/register'));
app.use('/auth',require('./router/auth'));
app.use('/refresh',require('./router/refresh'));
app.use('/logout',require('./router/logout'));

app.use('/posts' , require('./router/api/posts'));

app.use(errorhandler);


//app.use(verifyJWT);
//app.use('/users', require('./router/api/users'));
//app.use('/employees',require('./router/api/employees'));  


 mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}); 
 
 //app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));  
