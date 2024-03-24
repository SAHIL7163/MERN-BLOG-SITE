const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const postsSchema = new Schema({
    title : {
        type : String ,
        required : true 
    },
    datetime: {
        type : String ,
        required : true
    },
    body : {
        type : String ,
        required : true
    },
    imageUrl :{
        type : String ,
        required : true
    },
    filename :{
        type : String ,
        required : true
    },
    categoryId:{
   type:Number,
   required: true
    }
})

module.exports = mongoose.model('Posts' , postsSchema) ;