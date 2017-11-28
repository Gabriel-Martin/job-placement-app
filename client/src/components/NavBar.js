import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  signout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <Link to={"/"}>Home</Link>&nbsp;&nbsp;&nbsp;
        <Link to={"/signup"}>Signup</Link>&nbsp;&nbsp;&nbsp;
        <Link to={"/login"}>Login</Link>
        <button
          onClick={() => {
            this.signout();
          }}
        >
          Signout
        </button>
      </div>
    );
  }
}

export default NavBar;
