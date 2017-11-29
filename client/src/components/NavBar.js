import React, { Component } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import apiCheckUser from "../api/checkUserCrud.js";

class NavBar extends Component {
  signout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("userType", "none");
    this.props.history.push("/");
  };

  componentDidMount() {
    let userType = localStorage.getItem("userType");

    if (!userType) {
      localStorage.setItem("userType", "none");
    }
  }

  render() {
    let { userType } = this.props;
    console.log("nav render");

    return (
      <div>
        <div>
          {(userType === "none" && (
            <div>
              <button
                onClick={() => {
                  this.props.history.push("/");
                }}
              >
                Home
              </button>
              <button
                onClick={() => {
                  this.props.history.push("/signup");
                }}
              >
                Signup
              </button>
              <button
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                Login
              </button>
            </div>
          )) ||
            (userType === undefined && (
              <div>
                <button
                  onClick={() => {
                    this.props.history.push("/");
                  }}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    this.props.history.push("/signup");
                  }}
                >
                  Signup
                </button>
                <button
                  onClick={() => {
                    this.props.history.push("/login");
                  }}
                >
                  Login
                </button>
              </div>
            ))}
        </div>

        <div>
          {userType === "company" && (
            <div>
              <button
                onClick={() => {
                  this.props.history.push("/");
                }}
              >
                Home
              </button>
              <button
                onClick={() => {
                  this.props.history.push("/company/profile");
                }}
              >
                Profile
              </button>
              <button
                onClick={() => {
                  this.props.history.push("/job/new");
                }}
              >
                Create Job
              </button>

              <button
                onClick={() => {
                  this.signout();
                }}
              >
                Signout
              </button>
            </div>
          )}
        </div>

        <div>
          {userType === "applicant" && (
            <div>
              <button
                onClick={() => {
                  this.props.history.push("/");
                }}
              >
                Home
              </button>
              <button
                onClick={() => {
                  this.props.history.push("/applicant/profile");
                }}
              >
                Profile
              </button>
              <button
                onClick={() => {
                  this.signout();
                }}
              >
                Signout
              </button>
            </div>
          )}
        </div>
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

const Container = styled.div`
  background-color: black;
  padding: 15px;
`;

// const Span = styled.span`
// padding: 15px 15px;
// cursor: pointer;
// font-size: 18px;
// color: #fff;

// &:hover {
//   color: #947cb0;
//   text-decoration: underline;
// }
// `;

export default withRouter(NavBar);
