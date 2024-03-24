const path=require('path');
const fs =require('fs');
const fspromise =require('fs').promises;
const {format}=require('date-fns');
const {v4: uuid} =require('uuid');

const logevents = async(message,filename)=>
{
   const datetime= `${format(new Date(),'yyyy MM dd\tHH:mm:ss')}`;
   const logitem=`${datetime}\t${uuid()}\t${message}\n`;

   try{
    if(!fs.existsSync(path.join(__dirname,'..','logs')))
    {
     await fspromise.mkdir(path.join(__dirname,'..','logs'));
    }
    await fspromise.appendFile(path.join(__dirname,'..' ,'logs',filename) ,logitem);
   }
   catch(err)
   {
    console.log(err);
   }

}

const Logger =(req,res,next)=>
{
    logevents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}


module.exports ={logevents,Logger};