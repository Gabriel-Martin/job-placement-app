import React, { Component } from "react";

import applicant from "../../api/applicantCrud";

class ApplicantProfile extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    applicant.getById().then(applicant => {
      this.setState(state => ({
        ...applicant
      }));
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
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
