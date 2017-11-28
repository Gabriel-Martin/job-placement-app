import React, { Component } from "react";
import api from "../../api/applicationCrud";

import applicant from "../../api/applicantCrud";

class ApplicantProfile extends Component {
  constructor() {
    super();

    this.state = {
      applications: [],
      jobs: []
    };
  }

  componentDidMount() {
    api.getAll().then(data => {
      this.setState(state => {
        return {
          application: data
        };
      });
    });
  }

  render() {
    console.log(this.state.application);
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
            <div>
              {this.state.application.map(app => <div>{app.city}</div>)}
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
