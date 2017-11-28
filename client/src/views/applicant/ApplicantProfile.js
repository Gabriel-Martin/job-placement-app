import React, { Component } from "react";
import api from "../../api/applicationCrud";

import applicant from "../../api/applicantCrud";

class ApplicantProfile extends Component {
  constructor() {
    super();

<<<<<<< HEAD
    this.state = {
      application: []
    };
  }

  componentDidMount() {
    api.getAll().then(data => {
      this.setState(state => {
        return {
          application: data
        };
      });
=======
    this.state = {};
  }

  componentDidMount() {
    applicant.getById().then(applicant => {
      this.setState(state => ({
        ...applicant
      }));
>>>>>>> c1e2489031ac1370af204ef1884e04749701ff99
    });
  }

  render() {
<<<<<<< HEAD
    console.log(this.state.application);
=======
    console.log(this.state);
>>>>>>> c1e2489031ac1370af204ef1884e04749701ff99
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
