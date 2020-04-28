import React, { useState,useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createablog } from "../user/helper/userapicalls";

const AddBlog = () => {

    const { user, token } = isAuthenticated();
    const [ values,setValues]=useState({
        title:"",
        content:"",
        loading:false,
        error:"",
        createdBlog:"",
        getaRedirect:false,
        formData:new FormData()
    })
    const {title,content,loading,
        error,
        createdBlog,
        getaRedirect,
        formData}=values

    // //load everything before 
    // const preload=()=>{

    // }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        createablog(user._id, token, formData).then(data => {
        if (data.error) {
            setValues({ ...values, error: data.error });
        } else {
            setValues({
            ...values,
            title: "",
            content: "",
            loading: false,
            createdBlog: data.title
            });
        }
        });
    };
    
    
    const handleChange = name => event => {
        
        const value =event.target.value;
        console.log(value);
        
        
        //set the form with name and value so that we directly pass it to backend
        formData.set(name, value);
        setValues({ ...values, [name]: value });
        console.log(title);
    
    };

    
    const successMessage = () => (
        <div
        className="alert alert-success mt-3"
        style={{ display: createdBlog ? "" : "none" }}
        >
        <h4>{createdBlog} created successfully</h4>
        </div>
    );

    const warningMessage = () => {
        if (error) {
        return <h4 className="text-success">Failed to create Blog</h4>;
        }
    };

    const createBlogForm = () => (
        <form >
            <span>Add Blog Here</span>
            <div className="form-group">
                <input 
                onChange={handleChange("title")}
                name="title"
                className="form-control"
                placeholder="Name"
                value={title}
                />
            </div>
            <div className="form-group">
                <textarea
                onChange={handleChange("content")}
                name="content"
                className="form-control"
                placeholder="content"
                value={content}
                />
            </div>
            
            <button type="submit" onClick = {()=> onSubmit()}
                 className="btn btn-outline-success mb-3">
                Create Blog
            </button>
        </form>
    );

    return(
        <Base title="Add a Blog here!!"
        description="Welcome to Blog creation section"
        className="container bg-info p-4">
           <Link to="/user/dashboard" className="btn btn-md btn-dark mb-3">Go Back</Link>
      
            <div className="row bg-dark text-white rounded">
                <div className="col md-8 offset md-2">
                    {successMessage()}
                    {createBlogForm()}
                </div>
            </div>
        </Base>

    )
}
export default AddBlog;