import React from "react";
import Base from "../core/Base";

import { Link } from "react-router-dom";

const UserDashBoard = () => {
  return (
    <Base title="UserDashBoard page">
      <Link to="/user/create/blog" className="nav-link text-success">
              Create Blog
      </Link>
    </Base>
  );
};

export default UserDashBoard;
