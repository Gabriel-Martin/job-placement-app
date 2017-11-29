import React, { Component } from "react";
import styled from "styled-components";
import apiApplicant from "../../api/applicantCrud";
import NavBar from "../../components/NavBar";
import { Form, Input } from "semantic-ui-react";

class ApplicantProfileSettings extends Component {
  constructor() {
    super();

    this.state = {
      userType: "",
      applicant: {
        image: "",
        firstName: "",
        lastName: "",
        email: ""
      }
    };
  }

  onInputChange = event => {
    event.persist();

    this.setState(state => {
      return {
        applicant: {
          ...this.state.applicant,
          [event.target.name]: event.target.value
        }
      };
    });
  };

  onFormSubmit = event => {
    event.preventDefault();

    apiApplicant
      .update(this.state.applicant.id, this.state.applicant)
      .then(data => this.props.history.push("/applicant/profile"));
  };

  componentDidMount() {
    apiApplicant.getCurrent().then(data => {
      this.setState(state => {
        return {
          userType: localStorage.getItem("userType"),
          applicant: {
            ...this.state.applicant,
            ...data
          }
        };
      });
    });
  }
  render() {
    let { applicant, userType } = this.state;

    return (
      <Container>
        <NavBar userType={userType} />
        <Body>
          <h1>Applicant Profile Settings</h1>
          <Form onSubmit={this.onFormSubmit}>
            <Form.Input
              type="text"
              name={"email"}
              value={applicant.email}
              onChange={this.onInputChange}
              placeholder={"Email"}
            />
            <Form.Input
              type="text"
              name={"image"}
              value={applicant.image}
              onChange={this.onInputChange}
              placeholder={"Image"}
            />
            <Form.Input
              type="text"
              name={"firstName"}
              value={applicant.firstName}
              onChange={this.onInputChange}
              placeholder={"First Name"}
            />
            <Form.Input
              type="text"
              name={"lastName"}
              value={applicant.lastName}
              onChange={this.onInputChange}
              placeholder={"Last Name"}
            />
            <Form.Input type="submit" />
          </Form>
        </Body>
      </Container>
    );
  }
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Container = styled.div`background-color: #ececec;`;

export default ApplicantProfileSettings;
