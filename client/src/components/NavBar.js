import React, { Component } from "react";

import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

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

              <CompanySpan>
                <Span
                  onClick={() => {
                    this.signout();
                  }}
                >
                  Signout
                </Span>
              </CompanySpan>
            </div>
          )}
        </div>

        <div>
          {userType === "applicant" && (
            <div>
              <SLink to={"/"}>Home</SLink>
              <SLink to={"/applicant/profile"}>Profile</SLink>
              <UserSpan>
                <Span
                  onClick={() => {
                    this.signout();
                  }}
                >
                  Signout
                </Span>
              </UserSpan>
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
  background: #4b79a1; /* fallback for old browsers */
  width: 100%;
  background: -webkit-linear-gradient(
    to right,
    #283e51,
    #4b79a1
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #283e51,
    #4b79a1
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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

const UserSpan = styled.div`
  display: inline-block;
`;

const CompanySpan = styled.div`
  display: inline-block;
  @media (max-width: 386px) {
    position: relative;
    left: -4px;
    top: 8px;
  }
`;
export default withRouter(NavBar);
