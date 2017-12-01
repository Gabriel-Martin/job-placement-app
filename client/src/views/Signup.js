import React, { Component } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import apiCompany from "../api/companyCrud";
import apiApplicant from "../api/applicantCrud";
import styled from "styled-components";

import NavBar from "../components/NavBar";

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      signup: true,
      applicant: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      },
      company: {
        companyName: "",
        email: "",
        password: ""
      }
    };
  }

  showSignup = () => {
    let signup = this.state.signup;
    if (signup === true) {
      return this.setState(state => {
        return {
          signup: false
        };
      });
    }

    if (signup === false) {
      return this.setState(state => {
        return {
          signup: true
        };
      });
    }
  };

  onInputChangeApplicant = eventChangeApp => {
    eventChangeApp.persist();

    this.setState(state => {
      return {
        applicant: {
          ...this.state.applicant,
          [eventChangeApp.target.name]: eventChangeApp.target.value
        }
      };
    });
  };

  onInputChangeCompany = eventChangeComp => {
    eventChangeComp.persist();

    this.setState(state => {
      return {
        company: {
          ...this.state.company,
          [eventChangeComp.target.name]: eventChangeComp.target.value
        }
      };
    });
  };

  onFormSubmitApplicant = eventChangeApp => {
    eventChangeApp.preventDefault();

    let applicant = this.state.applicant;

    apiApplicant.signUp(applicant).then(data => {
      if (data.err) {
        return alert(data.err);
      }
      if (!data.err) {
        this.props.history.push("/login");
      }
    });
  };

  onFormSubmitCompany = eventChangeComp => {
    eventChangeComp.preventDefault();

    let company = this.state.company;

    apiCompany.signUp(company).then(data => {
      if (data.err) {
        return alert(data.err);
      }
      if (!data.err) {
        this.props.history.push("/login");
      }
    });
  };

  render() {
    let signup = this.state.signup;
    return (
      <Container>
        <NavBar />
        {signup ? (
          <Body>
            <Head3>Applicant Signup</Head3>
            <Padding>
              <Button color={"instagram"} onClick={() => this.showSignup()}>
                Company Signup
              </Button>
            </Padding>
            <Form size={"huge"} onSubmit={this.onFormSubmitApplicant}>
              <Form.Input
                type={"text"}
                name={"firstName"}
                label={"First Name"}
                placeholder={"First Name"}
                onChange={this.onInputChangeApplicant}
                required
              />
              <Form.Input
                type="text"
                name={"lastName"}
                label={"Last Name"}
                placeholder={"Last Name"}
                onChange={this.onInputChangeApplicant}
                required
              />
              <Form.Input
                type="text"
                name={"email"}
                label={"Email"}
                placeholder={"Email"}
                onChange={this.onInputChangeApplicant}
                required
              />
              <Form.Input
                type={"password"}
                name={"password"}
                label={"Password"}
                placeholder={"Password"}
                onChange={this.onInputChangeApplicant}
                required
              />
              <Button color={"instagram"} type="submit">
                Submit
              </Button>
            </Form>
          </Body>
        ) : (
          <Body>
            <Head3>Company Signup</Head3>
            <Padding>
              <Button color={"instagram"} onClick={() => this.showSignup()}>
                Applicant Signup
              </Button>
            </Padding>
            <Form size={"huge"} onSubmit={this.onFormSubmitCompany}>
              <Form.Input
                type="text"
                name={"companyName"}
                placeholder={"Company Name"}
                onChange={this.onInputChangeCompany}
                required
              />
              <Form.Input
                type="text"
                name={"email"}
                placeholder={"Email"}
                onChange={this.onInputChangeCompany}
                required
              />
              <Form.Input
                type="text"
                name={"password"}
                placeholder={"Password"}
                onChange={this.onInputChangeCompany}
                required
              />
              <Button color={"instagram"} type="submit">
                Submit
              </Button>
            </Form>
          </Body>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  background-color: #ececec;
`;

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

export default Signup;
