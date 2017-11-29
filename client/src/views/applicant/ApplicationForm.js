import React, { Component } from "react";
import styled from "styled-components";
import { Input, Form, Button, Dropdown } from "semantic-ui-react";
import apiApplication from "../../api/applicationCrud.js";

import NavBar from "../../components/NavBar";

class ApplicationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userType: "",
      application: {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        email: "",
        date: "",
        education: "highschool",
        applicationStatus: "applied",
        jobId: props.match.params.jobId
      }
    };
  }

  componentDidMount() {
    this.setState(state => {
      return {
        ...state,
        userType: localStorage.getItem("userType")
      };
    });
  }

  onInputChange = changeEvent => {
    changeEvent.persist();

    this.setState(state => {
      return {
        ...state,
        application: {
          ...state.application,
          [changeEvent.target.name]: changeEvent.target.value
        }
      };
    });
  };

  onFormSubmit = submitEvent => {
    submitEvent.preventDefault();

    apiApplication.create(this.state).then(data => {
      this.props.history.push("/applicant/profile");
    });
  };

  render() {
    let { userType, application } = this.state;
    return (
      <Container>
        <NavBar userType={userType} />
        <Padding>
          <h1>ApplicationForm</h1>
          <Form onSubmit={this.onFormSubmit}>
            <InputWidth>
              <Form.Input
                type="text"
                name={"firstName"}
                placeholder={"First Name"}
                onChange={this.onInputChange}
              />
              <Form.Input
                type="text"
                name={"lastName"}
                placeholder={"Last Name"}
                onChange={this.onInputChange}
              />
              <Form.Input
                type="text"
                name={"address"}
                placeholder={"Address"}
                onChange={this.onInputChange}
              />
              <Form.Input
                type="text"
                name={"city"}
                placeholder={"City"}
                onChange={this.onInputChange}
              />
              <Form.Input
                type="text"
                name={"state"}
                placeholder={"state"}
                onChange={this.onInputChange}
              />
              <Form.Input
                type="text"
                name={"zip"}
                placeholder={"zip"}
                onChange={this.onInputChange}
              />
              <Form.Input
                type="text"
                name={"phone"}
                placeholder={"phone"}
                onChange={this.onInputChange}
              />
              <Form.Input
                type="text"
                name={"email"}
                placeholder={"email"}
                onChange={this.onInputChange}
              />
              <Form.Input
                type="text"
                name={"date"}
                placeholder={"date"}
                onChange={this.onInputChange}
              />
              <Input
                type="text"
                name={"education"}
                placeholder={"education"}
                value={this.state.education}
                onChange={this.onInputChange}
                label={
                  <Dropdown
                    defaultValue=""
                    labelPosition="right"
                    options={[
                      { text: "highschool", value: "highschool" },
                      { text: "GED", value: "GED" },
                      { text: "college", value: "college" }
                    ]}
                  />
                }
              />
              <Padding>
                <Button color={"instagram"} type="submit">
                  Submit
                </Button>
              </Padding>
            </InputWidth>
          </Form>
        </Padding>
      </Container>
    );
  }
}
const Container = styled.div`
  min-height: 100vh;
  background-color: #ececec;
`;

const Padding = styled.div`
  padding: 10px;
`;

const InputWidth = styled.div`
  width: 400px;
`;

export default ApplicationForm;
