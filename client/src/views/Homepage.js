import React, { Component } from "react";

import apiJobs from "../api/jobCrud";

import NavBar from "../components/NavBar";

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: []
    };
  }

  componentDidMount() {
    apiJobs.getAll().then(jobs => {
      this.setState(state => ({
        jobs: jobs
      }));
    });
  }

  render() {
    let { jobs } = this.state;

    return (
      <div>
        <NavBar />
        <h1>Homepage</h1>
        {jobs &&
          jobs.map(job => (
            <div
              style={{
                border: "1px solid black",
                margin: "2px",
                padding: "2px"
              }}
              key={job.id}
              onClick={() => this.props.history.push(`/jobs/${job.id}`)}
            >
              <p>
                <strong> {job.company.companyName} </strong>
              </p>
              <p> {job.position} </p>
              <p> {job.description} </p>
            </div>
          ))}
      </div>
    );
  }
}

export default Homepage;
