import { API } from "../../backend";

//here user is passed as a parameter
export const signup = user => {
    //from here
  return fetch(`${API}/signup`, {
      //this is the req info u 
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
    //till above line is fetch request.
  })
  //if success
    .then(response => {
      return response.json();
    })
    // if error
    .catch(err => console.log(err));
};

export const signin = user => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//to ensure that user is continuously signed in bcoz browser doesn't remember json response
export const authenticate = (data, next) => {
    //window object is accessible
  if (typeof window !== "undefined") {
      //jwt token is set up
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = next => {
    //window object is accessible
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/signout`, {
      method: "GET"
    })
      .then(response => console.log("signout success"))
      .catch(err => console.log(err));
  }
};

export const isAuthenticated = () => {
    // in window object we are storing the Jwt so we check for it
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
      //in frontend we r checking if the token is  exactly same as the user we r looking for 
      //IT RETURNS  the entire localStorage object that has entire JWT
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
