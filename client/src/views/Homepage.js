import React, { Component } from "react";
import styled from "styled-components";

import apiJobs from "../api/jobCrud";

import NavBar from "../components/NavBar";

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userType: "",
      jobs: []
    };
  }

  componentDidMount() {
    apiJobs.getAll().then(jobs => {
      this.setState(state => ({
        ...state,
        userType: localStorage.getItem("userType"),
        jobs: jobs
      }));
    });
  }

  render() {
    let { jobs, userType } = this.state;

    return (
      <div>
        <NavBar userType={userType} />
        <Head>Home page</Head>
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

const Head = styled.h1`
  text-align: center;
  font-size: 75px;
`;
