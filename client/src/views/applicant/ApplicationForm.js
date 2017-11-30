import React, { Component } from "react";
import styled from "styled-components";
import { Input, Form, Button, Select } from "semantic-ui-react";
import apiApplication from "../../api/applicationCrud.js";
import apiJob from "../../api/applicantCrud";

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

    apiApplication.create(this.state.application).then(data => {
      this.props.history.push("/applicant/profile");
    });
  };

  render() {
    let { userType, application } = this.state;
    return (
      <Container>
        <NavBar userType={userType} />
        <Padding>
          <Title>ApplicationForm</Title>
          <Form onSubmit={this.onFormSubmit}>
            <InputWidth>
              <Form.Input
                label={"First Name"}
                type="text"
                name={"firstName"}
                placeholder={"First Name"}
                onChange={this.onInputChange}
                required
              />
              <Form.Input
                label={"Last Name"}
                type="text"
                name={"lastName"}
                placeholder={"Last Name"}
                onChange={this.onInputChange}
                required
              />
              <Form.Input
                label={"Address"}
                type="text"
                name={"address"}
                placeholder={"Address"}
                onChange={this.onInputChange}
                required
              />
              <Form.Input
                label={"City"}
                type="text"
                name={"city"}
                placeholder={"City"}
                onChange={this.onInputChange}
                required
              />
              <Form.Input
                label={"State"}
                type="text"
                name={"state"}
                placeholder={"State"}
                onChange={this.onInputChange}
                required
              />
              <Form.Input
                label={"Zip Code"}
                type="text"
                name={"zip"}
                placeholder={"Zip Code"}
                onChange={this.onInputChange}
                required
              />
              <Form.Input
                label={"Phone"}
                type="text"
                name={"phone"}
                placeholder={"###-###-####"}
                onChange={this.onInputChange}
                required
              />
              <Form.Input
                label={"Email"}
                type="text"
                name={"email"}
                placeholder={"Email"}
                onChange={this.onInputChange}
                required
              />
              <Form.Input
                label={"Data"}
                type="text"
                name={"date"}
                placeholder={"date"}
                onChange={this.onInputChange}
                required
              />
              <Form.Field
                control={Select}
                defaultValue=""
                labelPosition="right"
                placeholder={"Education"}
                options={[
                  { text: "highschool", value: "highschool" },
                  { text: "GED", value: "GED" },
                  { text: "college", value: "college" }
                ]}
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

const Title = styled.h1.attrs({ className: "avenir fw1 f1 " })``;

const Padding = styled.div`
  padding: 10px;
`;

const InputWidth = styled.div`
  width: 400px;
`;

export default ApplicationForm;
