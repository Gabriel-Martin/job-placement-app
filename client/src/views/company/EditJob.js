import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import styled from "styled-components";

import NavBar from "../../components/NavBar";
import apiJob from "../../api/jobCrud";

class EditJob extends Component {
  constructor() {
    super();

    this.state = {
      job: {
        description: "",
        experience: "",
        payRate: "",
        position: ""
      }
    };
  }

  componentDidMount() {
    apiJob.getById(this.props.match.params.jobId).then(job => {
      this.setState(state => {
        return {
          job: job,
          userType: localStorage.getItem("userType")
        };
      });
    });
  }

  onInputChange = event => {
    event.persist();

    this.setState(state => {
      return {
        job: {
          ...state.job,
          [event.target.name]: event.target.value
        }
      };
    });
  };

  onFormSubmit = event => {
    event.preventDefault();

    apiJob.update(this.props.match.params.jobId, this.state.job).then(() => {
      this.props.history.push(
        `/company/dashboard/${this.props.match.params.jobId}`
      );
    });
  };

  render() {
    let { job, userType } = this.state;

    return (
      <div>
        <NavBar userType={userType} />
        <Container>
          <h2>EditJob</h2>
          <EditForm onSubmit={this.onFormSubmit}>
            <Form.TextArea
              label={"Description"}
              type={"text"}
              name={"description"}
              placeholder={"Description"}
              onChange={this.onInputChange}
              value={job.description}
              required
            />
            <Form.Input
              label={"Experience"}
              type={"text"}
              placeholder={"Experience"}
              onChange={this.onInputChange}
              name={"experience"}
              value={job.experience}
              required
            />
            <Form.Input
              label={"Pay Rate"}
              type={"text"}
              placeholder={"Pay Rate"}
              onChange={this.onInputChange}
              name={"payRate"}
              value={job.payRate}
              required
            />
            <Form.Input
              label={"Position"}
              type={"text"}
              placeholder={"Position"}
              onChange={this.onInputChange}
              name={"position"}
              value={job.position}
              required
            />
            <Button color={"instagram"} type={"submit"}>
              Submit
            </Button>
          </EditForm>
        </Container>
      </div>
    );
  }
}

const Container = styled.div`
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const EditForm = styled(Form)`
  width: 88%;
  padding: 20px;
`;

export default EditJob;
