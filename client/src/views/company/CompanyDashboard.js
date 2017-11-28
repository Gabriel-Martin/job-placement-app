import React, { Component } from "react";
import { Link } from "react-router-dom";

import jobs from "../../api/jobCrud";

class CompanyDashboard extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    let { jobId } = this.props.match.params;
    jobs.getById(jobId).then(job => {
      this.setState(state => ({
        ...job
      }));
    });
  }

  render() {
    let { position = "", description = "", applications = [] } = this.state;
    console.log(this.state);

    return (
      <div>
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
            <h3>All Applications</h3>
            <div>
              {applications.map(app => (
                <div key={app.id}>
                  Name:
                  <Link to={`/company/application/${app.id}`}>
                    {app.firstName} {app.lastName}
                  </Link>
                </div>
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
