import React, { Component } from "react";
import apiJobs from "../../api/jobCrud";
import styled from "styled-components";
import { Form, Input, Button, TextArea } from "semantic-ui-react";
import NavBar from "../../components/NavBar";

class CreateJob extends Component {
  constructor() {
    super();

    this.state = {
      userType: ""
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

  formSubmit = submitE => {
    submitE.preventDefault();
    apiJobs.create(this.state).then(() => {
      this.props.history.push("/company/profile");
    });
  };

  inputChange = changeE => {
    changeE.persist();
    let name = changeE.target.name;
    let value = changeE.target.value;

    this.setState(state => {
      return {
        ...state,
        [name]: value
      };
    });
  };

  render() {
    let { userType } = this.state;
    return (
      <div>
        <NavBar userType={userType} />
        <Container>
          <Center>
            <Form onSubmit={this.formSubmit}>
              <Title>Post A Job</Title>
              <InputWidth>
                <Form.TextArea
                  label={"Description"}
                  type="text"
                  name={"description"}
                  placeholder={"description"}
                  onChange={this.inputChange}
                  required
                />
                <Form.Input
                  label={"Experience"}
                  type="text"
                  name={"experience"}
                  placeholder={"experience"}
                  onChange={this.inputChange}
                  required
                />
                <Form.Input
                  label={"Position"}
                  type="text"
                  name={"position"}
                  placeholder={"position"}
                  onChange={this.inputChange}
                  required
                />
                <Form.Input
                  label={"Pay Rate"}
                  type="text"
                  name={"payRate"}
                  placeholder={"pay rate"}
                  onChange={this.inputChange}
                  required
                />
                <Button color={"instagram"} type="submit">
                  Submit
                </Button>
              </InputWidth>
            </Form>
          </Center>
        </Container>
      </div>
    );
  }
}
const Container = styled.div`
  min-height: 100vh;
  background-color: #ececec;
  padding: 10px;
`;

const Title = styled.div.attrs({ className: "avenir fw1 f1 " })`
  padding: 15px;
  margin-bottom: 10px;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const InputWidth = styled.div`width: 400px;`;

export default CreateJob;
