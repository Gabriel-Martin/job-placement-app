import React, { Component } from "react";
import styled from "styled-components";
import { Form, Button, Select } from "semantic-ui-react";
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

    apiApplication.create(this.state.application).then(data => {
      this.props.history.push("/applicant/profile");
    });
  };

  render() {
    let { userType } = this.state;
    return (
      <Container>
        <NavBar userType={userType} />
        <Title>Application Form</Title>
        <Form
          onSubmit={this.onFormSubmit}
          style={{ maxWidth: "450px", width: "95%" }}
        >
          <Form.Input
            required
            type="text"
            name={"firstName"}
            label={"First Name"}
            placeholder={"First Name"}
            onChange={this.onInputChange}
          />
          <Form.Input
            required
            type="text"
            name={"lastName"}
            label={"Last Name"}
            placeholder={"Last Name"}
            onChange={this.onInputChange}
          />
          <Form.Input
            required
            type="text"
            name={"address"}
            label={"Address"}
            placeholder={"Address"}
            onChange={this.onInputChange}
          />
          <Form.Input
            required
            type="text"
            name={"city"}
            label={"City"}
            placeholder={"City"}
            onChange={this.onInputChange}
          />
          <Form.Input
            required
            type="text"
            name={"state"}
            label={"State"}
            placeholder={"State"}
            onChange={this.onInputChange}
          />
          <Form.Input
            required
            type="text"
            name={"zip"}
            label={"Zip Code"}
            placeholder={"Zip Code"}
            onChange={this.onInputChange}
          />
          <Form.Input
            required
            type="tel"
            label={"Phone"}
            name={"phone"}
            placeholder={"###-###-####"}
            onChange={this.onInputChange}
          />
          <Form.Input
            required
            type="email"
            name={"email"}
            label={"Email"}
            placeholder={"Email"}
            onChange={this.onInputChange}
          />
          <Form.Input
            required
            type="date"
            name={"date"}
            label={"Date"}
            placeholder={"date"}
            onChange={this.onInputChange}
          />
          <Form.Field
            required
            defaultValue=""
            control={Select}
            upward
            label={"Education"}
            placeholder={"Education"}
            options={[
              { text: "highschool", value: "highschool" },
              { text: "GED", value: "GED" },
              { text: "college", value: "college" }
            ]}
          />
          <Button type="submit" color={"instagram"} style={{ padding: "10px" }}>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
`;

const Title = styled.h1.attrs({ className: "avenir fw1 f1 " })`
  text-align: center;
`;

export default ApplicationForm;
