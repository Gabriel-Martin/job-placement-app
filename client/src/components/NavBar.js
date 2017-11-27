import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div>
        <Link to={"/"}>Home</Link>&nbsp;&nbsp;&nbsp;
        <Link to={"/signup"}>Signup</Link>&nbsp;&nbsp;&nbsp;
        <Link to={"/login"}>Login</Link>
      </div>
    );
  }
}

export default NavBar;
