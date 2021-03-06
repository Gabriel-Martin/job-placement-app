import React, { Component } from "react";
import styled from "styled-components";
import apiCompany from "../api/companyCrud";
import apiApplicant from "../api/applicantCrud";
import { Form, Button } from "semantic-ui-react";

import NavBar from "../components/NavBar";

import apiCheckUser from "../api/checkUserCrud.js";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      login: "Applicant",
      loginNext: "Company",
      email: "",
      password: ""
    };
  }

  onInputChange = eventChange => {
    eventChange.persist();

    this.setState(state => {
      return {
        ...this.state,
        [eventChange.target.name]: eventChange.target.value
      };
    });
  };

  changeLoginState = () => {
    let login = this.state.login;

    if (login === "Company") {
      this.setState(state => {
        return {
          login: "Applicant",
          loginNext: "Company",
          email: "",
          password: ""
        };
      });
    }

    if (login === "Applicant") {
      this.setState(state => {
        return {
          login: "Company",
          loginNext: "Applicant",
          email: "",
          password: ""
        };
      });
    }
  };

  onFormSubmit = eventChange => {
    eventChange.preventDefault();
    let login = this.state.login;

    if (login === "Applicant") {
      this.applicantLogin();
    }
    if (login === "Company") {
      this.companyLogin();
    }
  };

  applicantLogin = () => {
    let loginData = this.state;

    apiApplicant
      .login(loginData)
      .then(data => {
        if (data.err) {
          return alert(data.err);
        }
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
      })
      .then(() => {
        apiCheckUser.checkUser().then(data => {
          if (!data.userType) {
            return localStorage.setItem("userType", "none");
          }
          localStorage.setItem("userType", data.userType);
          return this.props.history.push("/applicant/profile");
        });
      });
  };

  companyLogin = () => {
    let loginData = this.state;

    apiCompany
      .login(loginData)
      .then(data => {
        if (data.err) {
          return alert(data.err);
        }
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
      })
      .then(() => {
        apiCheckUser.checkUser().then(data => {
          if (!data.userType) {
            return localStorage.setItem("userType", "none");
          }
          localStorage.setItem("userType", data.userType);
          return this.props.history.push("/company/profile");
        });
      });
  };

  render() {
    let { login, loginNext } = this.state;

    return (
      <Container>
        <NavBar />
        <Body>
          <Head3>{login} Login</Head3>
          <Padding>
            <Button color={"instagram"} onClick={() => this.changeLoginState()}>
              {loginNext}
            </Button>
          </Padding>

          <Form size={"huge"} onSubmit={this.onFormSubmit}>
            <Form.Input
              type={"text"}
              label={"Email"}
              name={"email"}
              placeholder={"Email"}
              value={this.state.email}
              onChange={this.onInputChange}
              required
            />
            <Form.Input
              type={"password"}
              label={"Password"}
              name={"password"}
              placeholder={"Password"}
              value={this.state.password}
              onChange={this.onInputChange}
              required
            />
            <Button color={"instagram"} type="submit">
              Submit
            </Button>
          </Form>
        </Body>
      </Container>
    );
  }
}
const Head3 = styled.h3.attrs({ className: "avenir fw1 f1 " })`
  text-align: center;
  font-size: 50px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

// const Button = styled.button`
//   font-size: 20px;
//   border-radius: 8px;
//   background-color: #526760;
//   color: #f9eed6;
// `;

const Padding = styled.div`
  padding: 10px;
`;

const Container = styled.div`
  background-color: #ececec;
`;

export default Login;
