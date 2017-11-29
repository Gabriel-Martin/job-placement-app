import React, { Component } from "react";
import apiApplicant from "../api/applicantCrud";
import apiJobs from "../api/jobCrud";
import styled from "styled-components";
import { Button } from "semantic-ui-react";

import NavBar from "../components/NavBar";

class JobDescriptionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    let { jobId } = this.props.match.params;
    apiJobs.getById(jobId).then(job => {
      this.setState(state => ({
        userType: localStorage.getItem("userType"),
        ...job
      }));
    });
  }

  interested = jobId => {
    apiApplicant.addJob(jobId).then(() => {
      this.props.history.push("/applicant/profile");
    });
  };

  render() {
    let { jobId } = this.props.match.params;

    let {
      company = {},
      description = "",
      position = "",
      payRate = "",
      experience = "",
      userType = ""
    } = this.state;

    return (
      <Container>
        <NavBar userType={userType} />
        >
        <Title>Job Description</Title>
        <Card>
          <h3>Company: {company.companyName} </h3>
          <h4>Position: {position} </h4>
          <p>
            <b>Description:</b> {description}
          </p>
          <p>
            <b>Payrate:</b> ${payRate}
          </p>
          <p>
            <b>Experience:</b> {experience}
          </p>
          {userType === "applicant" && (
            <Column>
              <Button onClick={() => this.interested(jobId)}>
                Interested?
              </Button>

              <Button
                onClick={() =>
                  this.props.history.push(`/applicant/applicationform/${jobId}`)
                }
              >
                Apply!
              </Button>
            </Column>
          )}
        </Card>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background-color: #ececec;
  min-height: 100vh;
`;

const Card = styled.div`
  border: 200px solid #fff;
  margin: 10px auto;
  border-radius: 15px;
  background-color: #fff;
`;

const Title = styled.h1`
  font-size: 60px;
  text-align: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default JobDescriptionPage;
