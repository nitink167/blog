const express=require('express');
const router=express.Router();

const {isSignedIn,isAuthenticated}=require('../controllers/authentication');
const {getUserById}=require('../controllers/user');
const {getBlogById,createBlog,getBlog,updateBlog,deleteBlog}=require('../controllers/blog');


router.param('userId',getUserById);

router.param('blogId',getBlogById);

router.post('/blog/add/:userId', isSignedIn, isAuthenticated , createBlog);

//getting the user post
router.get("/blog/all" ,getBlog);

//TODO:getting all available posts of a specific user

//update post
router.put('/blog/update/:userId/:blogId', isSignedIn, isAuthenticated , updateBlog);

//delete post
router.delete('/blog/delete/:userId/:blogId', isSignedIn, isAuthenticated , deleteBlog);



module.exports=router; 