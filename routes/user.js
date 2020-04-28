const express=require('express');
const router=express.Router();

const {isSignedIn,isAuthenticated,isAdmin}=require('../controllers/authentication');
const {getUserById,getUser,getAllUsers}=require('../controllers/user');

router.param('userId',getUserById);

//passing the middleware
router.get("/user/:userId",isSignedIn, isAuthenticated ,getUser);

//fetching all users
router.get("/users",getAllUsers);


module.exports=router; 