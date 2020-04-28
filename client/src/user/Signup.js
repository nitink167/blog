import React,{useState} from "react";
import Base from '../core/Base';
import {Link} from "react-router-dom";
import {signup} from '../auth/helper';

//state is where u keep everything and update it from here
// useState comprises of many things--boolean ,array,object 

const Signup=()=>{

    //1. where we r storing the data temporaily before sending it to backend
    //defining the states so that form  values are stored 
    const [values,setValues]=useState({
        user_name:"",
        email:"",
        password:"",
        error:"",
        success:false
    });

    //destructuring so that we can access directly 
    const{user_name,email,password,error,success}=values

    //2. handleChanges using functional programming
    //handling with just 1 value (advanced JS)
    //here name will take paramater everytime as name,email then pwd then value will be set in the state

    //this function gets what is passed from input field as parameter 
    const handleChange=user_name=>event=>{
        //then we destruct that value n then set it with the value passed by user
        setValues({...values,error:false,[user_name]:event.target.value})

    }

    //3. onSubmit
    const onSubmit=e=>{
        e.preventDefault();
        setValues({...values,error:false})
        signup({user_name,email,password})
            .then(data => {
                if(data.error){
                    setValues({...values,error:data.error ,success:false})
                }
                else{
                    setValues({
                        ...values,
                        user_name:"",
                        email:"",
                        password:"",
                        error:"",
                        success:true
                    })
                }
            }).catch(console.log("Error in Signup"));
    }

    const SignupForm=()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label  className="text-light">Name</label> 
                            <input className="form-control" type="text" value={user_name}
                             onChange={handleChange("user_name")} name="" id=""/>
                        </div>    

                        
                        <div className="form-group">
                            <label  className="text-light">Email</label> 
                            <input className="form-control" type="email" value={email}
                             onChange={handleChange("email")} name="" id=""/>
                        </div>

                        
                        <div className="form-group">
                            <label  className="text-light">Password</label> 
                            <input className="form-control" type="password" value={password}
                             onChange={handleChange("password")} name="" id=""/>
                        </div>

                        <button onClick={onSubmit} className="button btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    const successMessage=()=>(
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-success"
                //display is a flexbox property deciding it on basis of error or success 
                //& if true then display the below text
                 style={{display: success? "":"none"}}
                >
                    New account created successfuly.Please<Link to="/signin">Login Here</Link>
                </div>
            </div>
        </div>
    )

    const errorMessage=()=>(
        
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-danger"
                //display is a flexbox property deciding it on basis of error or success
                style={{display: error? "":"none"}}
                >
                {error}
                </div>
            </div>
        </div>
    )

    return(
        <Base title="Signup Page" description="Apage for user to  signup">
            {successMessage()}
            {errorMessage()}
            {SignupForm()}
            <p className="text-white text-center" >{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signup; 