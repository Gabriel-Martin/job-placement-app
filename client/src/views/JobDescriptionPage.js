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
        job: job
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

    let { job = {}, userType = "" } = this.state;
    return (
      <Container>
        <NavBar userType={userType} />

        <Title>Job Description</Title>
        <Card>
          <h3>Company: {job.company && job.company.companyName} </h3>

          <h4>Position: {job.position} </h4>
          <p style={{ wordWrap: "break-word" }}>
            <b>Description:</b> {job.description}
          </p>
          <p>
            <b>Payrate:</b> ${job.payRate}
          </p>
          <p>
            <b>Experience:</b> {job.experience}
          </p>
          {(userType === "applicant" && (
            <Column>
              <Button
                color={"instagram"}
                onClick={() => this.interested(jobId)}
              >
                Interested?
              </Button>

              <Button
                color={"instagram"}
                onClick={() =>
                  this.props.history.push(`/applicant/applicationform/${jobId}`)
                }
              >
                Apply!
              </Button>
            </Column>
          )) ||
            (userType === "none" && (
              <Button
                color={"instagram"}
                onClick={() => this.props.history.push(`/signup`)}
              >
                Apply!
              </Button>
            ))}
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
  margin: 10px auto;
  padding: 50px;
  border-radius: 15px;
  background-color: #fff;
  width: 60%;
`;

const Title = styled.h1.attrs({ className: "avenir fw1 f1 " })`
  font-size: 60px;
  text-align: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: row;
`;

export default JobDescriptionPage;
