import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import apiCheckUser from "../api/checkUserCrud.js";

class NavBar extends Component {
  constructor() {
    super();

    this.state = {
      userType: "none"
    };
  }
  signout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("userType", "none");
    this.props.history.push("/");
  };

  componentWillMount() {
    apiCheckUser.checkUser().then(data => {
      if (data.userType === "company") {
        localStorage.setItem("userType", data.userType);
      }
      if (data.userType === "applicant") {
        localStorage.setItem("userType", data.userType);
      }
      if (!data.userType) {
        localStorage.setItem("userType", "none");
      }
    });
  }

  componentWillReceiveProps(props) {
    apiCheckUser.checkUser().then(data => {
      if (data.userType === "company") {
        localStorage.setItem("userType", data.userType);
      }
      if (data.userType === "applicant") {
        localStorage.setItem("userType", data.userType);
      }
      if (!data.userType) {
        localStorage.setItem("userType", "none");
      }
    });
  }

  render() {
    let userType = localStorage.getItem("userType");

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
            (!userType && (
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

export default withRouter(NavBar);
