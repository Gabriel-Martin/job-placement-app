import React, { Component } from "react";

import apiJobs from "../../api/jobCrud";

import NavBar from "../../components/NavBar";

class CompanyDashboard extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    let { jobId } = this.props.match.params;
    apiJobs.getById(jobId).then(job => {
      this.setState(state => ({
        ...job
      }));
    });
  }

  render() {
    let { position = "", description = "", application = [] } = this.state;

    return (
      <div>
        <NavBar />
        <h1>Company Dashboard</h1>
        <h3>Position: {position} </h3>
        <p>Description: {description} </p>
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
            <h3>Applications</h3>
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
            <h3>Hired</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyDashboard;
