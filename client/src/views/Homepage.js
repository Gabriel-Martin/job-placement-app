import React, { Component } from "react";
import styled from "styled-components";
import jobs from "../api/jobCrud";

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: []
    };
  }

  componentDidMount() {
    jobs.getAll().then(jobs => {
      this.setState(state => ({
        jobs: jobs
      }));
    });
  }

  render() {
    let { jobs } = this.state;
    console.log(jobs);
    return (
      <div>
        <Head>Homepage</Head>
        {jobs &&
          jobs.map(job => (
            <div
              style={{
                border: "1px solid black",
                margin: "5px",
                padding: "5px"
              }}
              key={job.id}
              onClick={() => this.props.history.push(`/jobs/${job.id}`)}
            >
              <h2> {job.company.companyName} </h2>
              <h3> {job.position} </h3>
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
