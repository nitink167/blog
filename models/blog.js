const mongoose=require('mongoose');

//destructring by {}
const {ObjectId}=mongoose.Schema;
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    content:{
        type:String,
        trim:true,
        required:true,
        maxlength:2000 
    },
    author:{
        type:ObjectId,
        ref: "User"
    },
    
    salt:String
    

},
{timestamps:true});

module.exports=mongoose.model("Blog",blogSchema)