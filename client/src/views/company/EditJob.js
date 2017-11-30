import React, { Component } from "react";
import { Form } from "semantic-ui-react";
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
          job: job
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
    let { job } = this.state;
    return (
      <Container>
        <NavBar />
        <Body>
          <h1>EditJob</h1>
          <Form onSubmit={this.onFormSubmit}>
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
            <Form.Input type={"submit"} />
          </Form>
        </Body>
      </Container>
    );
  }
}

const Container = styled.div`background-color: #ececec;`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default EditJob;
