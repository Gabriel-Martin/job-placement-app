import React, { Component } from "react";
import { Link } from "react-router-dom";

import apiApplicant from "../../api/applicantCrud";

import NavBar from "../../components/NavBar";

class ApplicantProfile extends Component {
  constructor() {
    super();

    this.state = {
      applications: [],
      userType: "",
      jobs: []
    };
  }

  componentDidMount() {
    apiApplicant.getCurrent().then(applicant => {
      this.setState(state => {
        return {
          ...applicant,
          userType: localStorage.getItem("userType")
        };
      });
    });
  }

  render() {
    let { id, applications, userType } = this.state;
    console.log(this.state);

    // filtering all applications and assigning
    // to array based on 'status' property
    let applied = applications.filter(
      app => app.applicationStatus === "applied"
    );

    let processing = applications.filter(
      app => app.applicationStatus === "pending"
    );

    let status = applications.filter(
      app =>
        app.applicationStatus === "hired" ||
        app.applicationStatus === "declined"
    );

    return (
      <div>
        <NavBar userType={userType} />
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
            {applied.map(app => (
              <div>
                <h4> {app.job.position} </h4>
              </div>
            ))}
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
            {processing.map(app => (
              <div>
                <h4> {app.job.position} </h4>
              </div>
            ))}
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
            {status.map(app => (
              <div>
                <h4> {app.job.position} </h4>
                <p> Status: {app.applicationStatus} </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicantProfile;
