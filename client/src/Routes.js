import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AddBlog from './admin/AddBlog'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route  exact path="/signup" component={Signup}/>    
        <Route  exact path="/signin" component={Signin}/>
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <PrivateRoute path="/user/create/blog" exact component={AddBlog} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
