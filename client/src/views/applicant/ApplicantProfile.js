import React, { Component } from "react";
import { Link } from "react-router-dom";

import apiApplicant from "../../api/applicantCrud";

import NavBar from "../../components/NavBar";

class ApplicantProfile extends Component {
  constructor() {
    super();

    this.state = {
      applications: [],
      jobs: []
    };
  }

  componentDidMount() {
    apiApplicant.getCurrent().then(applicant => {
      this.setState(state => {
        return {
          ...applicant
        };
      });
    });
  }

  render() {
    let { id } = this.state;

    return (
      <div>
        <NavBar />
        <Link to={`/applicant/profile/settings/${id}`}>Applicant Settings</Link>
        <h1>Applicant Profile</h1>
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
            <h3>Interested</h3>
            <div>
              {this.state.jobs.map(j => <div key={j.id}>{j.position}</div>)}
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
            <h3>Applied</h3>
            <div />
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
            <h3>Processing</h3>
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
            <h3>Status</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicantProfile;
