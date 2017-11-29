import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import apiApplicant from "../../api/applicantCrud";
import apiJob from "../../api/jobCrud";
import NavBar from "../../components/NavBar";

class ApplicantProfile extends Component {
  constructor() {
    super();

    this.state = {
      applicant: {}
    };
  }

  componentDidMount() {
    apiApplicant.getCurrent().then(applicant => {
      this.setState(state => {
        return {
          applicant: applicant
        };
      });
    });
  }

  render() {
    let { applicant } = this.state;
    console.log(applicant);
    return (
      <Container>
        <NavBar />
        <Link to={`/applicant/profile/settings/${applicant.id}`}>
          Applicant Settings
        </Link>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <h1 style={{ fontSize: "50px" }}>{applicant.firstName}'s Profile</h1>
          <Img src={applicant.image} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid black",
              width: "20%",
              height: "100vh"
            }}
          >
            <Head3>Interested</Head3>
            <div>
              <hr />
              {applicant.jobs &&
                applicant.jobs.map(j => <div key={j.id}>{j.position}</div>)}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid black",
              width: "20%",
              height: "100vh"
            }}
          >
            <Head3>Applied</Head3>
            <div>
              {applicant.applications &&
                applicant.applications.map(app => (
                  <div key={app.id}>{app.job.position}</div>
                ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid black",
              width: "20%",
              height: "100vh"
            }}
          >
            <Head3>Processing</Head3>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid black",
              width: "20%",
              height: "100vh"
            }}
          >
            <Head3>Status</Head3>
          </div>
        </div>
      </Container>
    );
  }
}
const Img = styled.img`
  border-radius: 50%;
  height: 75px;
`;

const Container = styled.div`
  background-color: #ececec;
`;

const Head3 = styled.h3`
  text-align: center;
  font-size: 30px;
`;
export default ApplicantProfile;
