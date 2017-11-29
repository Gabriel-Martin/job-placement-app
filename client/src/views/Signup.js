import React, { Component } from "react";
import { Form, Input } from "semantic-ui-react";
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
        {signup ? (
          <Body>
            <Head3>Applicant Signup</Head3>
            <Button onClick={() => this.showSignup()}>Company Signup</Button>
            <Form size={"huge"} onSubmit={this.onFormSubmitApplicant}>
              <Form.Input
                type="text"
                name={"firstName"}
                placeholder={"First Name"}
                onChange={this.onInputChangeApplicant}
              />
              <Form.Input
                type="text"
                name={"lastName"}
                placeholder={"Last Name"}
                onChange={this.onInputChangeApplicant}
              />
              <Form.Input
                type="text"
                name={"email"}
                placeholder={"Email"}
                onChange={this.onInputChangeApplicant}
              />
              <Form.Input
                type="text"
                name={"password"}
                placeholder={"Password"}
                onChange={this.onInputChangeApplicant}
              />
              <Button type="submit">Submit</Button>
            </Form>
          </Body>
        ) : (
          <Body>
            <Head3>Company Signup</Head3>
            <Button onClick={() => this.showSignup()}>Applicant Signup</Button>
            <Form size={"huge"} onSubmit={this.onFormSubmitCompany}>
              <Form.Input
                type="text"
                name={"companyName"}
                placeholder={"Company Name"}
                onChange={this.onInputChangeCompany}
              />
              <Form.Input
                type="text"
                name={"email"}
                placeholder={"Email"}
                onChange={this.onInputChangeCompany}
              />
              <Form.Input
                type="text"
                name={"password"}
                placeholder={"Password"}
                onChange={this.onInputChangeCompany}
              />
              <Button type="submit">Submit</Button>
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

export default Signup;
