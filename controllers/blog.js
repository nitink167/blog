const Blog=require('../models/blog');
const User=require('../models/user');



exports.getBlogById=(req,res,next,id)=>{
    //here u need to inject individual product name & price,so populate
    Blog.findById(id)
    .exec((err,blog)=>{
        if(err){
            return res.status(400).json({
                error:" No order  found in DB "
            })
        }
        req.blog=blog;
        next();
    })
}

exports.getBlog=(req,res)=>{
    //here u need to inject individual product name & price,so populate
    Blog.find() 
    .populate("author","user_name")
    .exec((err,blogs)=>{
        if(err){
            return res.status(400).json({
                error:" No blogs  found in DB "
            })
        }
        res.json(blogs)
    })
}

exports.createBlog=(req,res)=>{

    //req.body.blog.author=req.profile
    const blog=new Blog({
        title:req.body.title,
        content:req.body.content,
        author:req.params.userId
        
    });
    blog.save((err,blog)=>{
        if(err){
            return res.status(400).json({
                error:" Unable to save blog in DB "
            })
        }
        res.json(blog);
    })
}


 exports.updateBlog=(req,res)=>{
    const blog=req.blog;
    blog.title=req.body.title;
    blog.content=req.body.content

    blog.save((err,updatedBlog)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to update Blog"
            })
        }
        res.json(updatedBlog); 
    })
}
  


exports.deleteBlog=(req,res)=>{
    const blog=req.blog

    //in the object below we get blog that just removed
    blog.remove((err,blog)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete blog"
            })
        }
        res.json({
            message:` ${blog} successfully deleted`
        })
    })
}