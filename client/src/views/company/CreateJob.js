import React, { Component } from "react";
import apiJobs from "../../api/jobCrud";
import styled from "styled-components";
import { Form, Button } from "semantic-ui-react";
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
          <CreateForm onSubmit={this.formSubmit}>
            <Title>Post A Job</Title>
            <Form.TextArea
              cols={"40"}
              wrap={"hard"}
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
          </CreateForm>
        </Container>
      </div>
    );
  }
}

const Title = styled.div.attrs({ className: "avenir fw1 f1 " })`
  padding: 15px;
  margin-bottom: 10px;
`;

const Container = styled.div`
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const CreateForm = styled(Form)`
  width: 88%;
  padding: 20px;
`;
export default CreateJob;
