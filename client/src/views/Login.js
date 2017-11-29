import React, { Component } from "react";
import styled from "styled-components";
import apiCompany from "../api/companyCrud";
import apiApplicant from "../api/applicantCrud";
import { Form, Input } from "semantic-ui-react";

import NavBar from "../components/NavBar";

import apiCheckUser from "../api/checkUserCrud.js";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      login: "Applicant",
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
          login: "Applicant"
        };
      });
    }

    if (login === "Applicant") {
      this.setState(state => {
        return {
          login: "Company"
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
            localStorage.setItem("userType", "none");
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
            localStorage.setItem("userType", "none");
          }
          localStorage.setItem("userType", data.userType);
          return this.props.history.push("/company/profile");
        });
      });
  };

  render() {
    let { login } = this.state;

    return (
      <Container>
        <NavBar />
        <Body>
          <Head3>{login} Login</Head3>
          <div>
            <Button onClick={() => this.changeLoginState()}>{login}</Button>
          </div>

          <Form size={"huge"} onSubmit={this.onFormSubmit}>
            <Form.Input
              type="text"
              name={"email"}
              placeholder={"Email"}
              onChange={this.onInputChange}
            />
            <Form.Input
              type="text"
              name={"password"}
              placeholder={"Password"}
              onChange={this.onInputChange}
            />
            <Button type="submit">Submit</Button>
          </Form>
        </Body>
      </Container>
    );
  }
}
const Head3 = styled.h3`
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

const Button = styled.button`
  font-size: 20px;
  border-radius: 8px;
  background-color: #526760;
  color: #f9eed6;
`;

const Container = styled.div`
  background-color: #ececec;
`;

export default Login;
