const User=require("../models/user");



//method with params
exports.getUserById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err||!user){
            return res.status(400).json({
                error:"No user was found in DB"
            })
        }
        //object inside the req i.e. profile
        req.profile=user
        next();
    });
};


exports.getUser=(req,res)=>{
    req.profile.salt=undefined;
    req.profile.encry_password=undefined;
    //this isn't working
    //req.timestamps=undefined;
    return res.json(req.profile)
}


// //method for fetching all users
exports.getAllUsers=(req,res)=>{
    User.find().exec((err,users)=>{
        if(err||!users){
            return res.status(400).json({
                error:"No users found"
            })
        }
         res.json(users);
    })
}
