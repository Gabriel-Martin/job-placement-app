import React, { Component } from "react";
import styled from "styled-components";
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

// style for the nav-bar
// not implemented yet because Caleb is still working on navbar

// const SLink = styled(Link)`
//   text-decoration: none;
//   padding: 10px;
//   font-size: 18px;
//   color: #fff;

//   &:hover {
//     color: #568ea3;
//     text-decoration: underline;
//   }
// `;

// const Container = styled.div`
//   background-color: black;
//   padding: 15px;
// `;

export default NavBar;
