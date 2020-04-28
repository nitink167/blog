import { API } from "../../backend";

//create a blog
export const createablog = (userId, token, blog) => {
  return fetch(`${API}/blog/add/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body:  blog
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//Homepage--display all blogs
// //get all blogs
// export const getblogs = () => {
//   return fetch(`${API}/blogs`, {
//     method: "GET"
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => console.log(err));
// };

//delete a blog

export const deleteblog = (blogId, userId, token) => {
  return fetch(`${API}/blog/delete/${userId}/${blogId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


//update a blog

export const updateblog = (blogId, userId, token, blog) => {
  return fetch(`${API}/blog/update/${userId}/${blogId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: blog
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
