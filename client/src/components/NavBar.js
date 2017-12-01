import React, { Component } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import apiCheckUser from "../api/checkUserCrud.js";

class NavBar extends Component {
  signout = () => {
    if (this.props.location.pathname === "/") {
      localStorage.removeItem("token");
      localStorage.setItem("userType", "none");
      window.location.reload();
    }

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
    return (
      <Container>
        <div>
          {(userType === "none" && (
            <div>
              <SLink to={"/"}> Home </SLink>&nbsp;&nbsp;&nbsp;
              <SLink to={"/signup"}>Signup</SLink>&nbsp;&nbsp;&nbsp;
              <SLink to={"/login"}> Login </SLink>&nbsp;&nbsp;&nbsp;
            </div>
          )) ||
            (userType === undefined && (
              <div>
                <SLink to={"/"}> Home </SLink>&nbsp;&nbsp;&nbsp;
                <SLink to={"/signup"}>Signup</SLink>&nbsp;&nbsp;&nbsp;
                <SLink to={"/login"}> Login </SLink>&nbsp;&nbsp;&nbsp;
              </div>
            ))}
        </div>

        <div>
          {userType === "company" && (
            <div>
              <SLink to={"/"}>Home</SLink>
              <SLink to={"/company/profile"}>Profile</SLink>
              <SLink to={"/job/new"}>Create Job</SLink>

              <Span
                onClick={() => {
                  this.signout();
                }}
              >
                Signout
              </Span>
            </div>
          )}
        </div>

        <div>
          {userType === "applicant" && (
            <div>
              <SLink to={"/"}>Home</SLink>
              <SLink to={"/applicant/profile"}>Profile</SLink>
              <Span
                onClick={() => {
                  this.signout();
                }}
              >
                Signout
              </Span>
            </div>
          )}
        </div>
      </Container>
    );
  }
}

const SLink = styled(Link)`
  text-decoration: none;
  padding: 10px;
  font-size: 18px;
  color: #fff;

  &:hover {
    color: #568ea3;
    text-decoration: underline;
  }
`;

const Container = styled.div`
  background-color: black;
  padding: 20px;
`;

const Span = styled.span`
  padding: 15px 15px;
  cursor: pointer;
  font-size: 18px;
  color: #fff;

  &:hover {
    color: #568ea3;
    text-decoration: underline;
  }
`;

export default withRouter(NavBar);
