//creating a schema
//Naming convention--file name should be singular

const mongoose=require('mongoose');
const crypto=require('crypto');
const uuidv1 =require('uuid/v1');

var userSchema=new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
        maxlength:32,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    //encrypt the password

    encry_password:{
        type:String,
        required:true
    },

    

    //salt is an additional data type that hashes the value
    //use the same salt and hash the same password & match that against the hashed password stored in db.

    salt:String
    

},
{timestamps:true});


//virtual fields
userSchema.virtual("password")
    .set(function(password){
        this._password=password
        this.salt=uuidv1();
        this.encry_password=this.securePassword(password)
    })
    .get(function(){
        return this._password
    })

//method
userSchema.methods={
    //define any no. of func or methods here
    securePassword:function(plainpassword){
        if(!plainpassword){
            return "";
        }
        try{
            return crypto.createHmac('sha256', this.salt/**some value which is already set */)
            .update(plainpassword)
            .digest('hex');
        }
        catch(err){
            return "";
        }
    },
    authenticate:function(plainpassword){
        return this.securePassword(plainpassword)==this.encry_password
    }
}

module.exports=mongoose.model("User",userSchema)