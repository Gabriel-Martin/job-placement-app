import React, { Component } from "react";
import styled from "styled-components";
import { Card, Table } from "semantic-ui-react";
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
      <Container>
        <NavBar userType={userType} />
        <Head>!Employed</Head>
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-evenly"
          }}
        >
          {jobs &&
            jobs.map(job => (
              <div
                key={job.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  width: "400px",
                  padding: "10px",
                  justifyContent: "space-evenly"
                }}
              >
                <Card
                  style={{
                    height: "200px",
                    overflow: "auto"
                  }}
                  fluid
                  link
                  href={`/jobs/${job.id}`}
                  header={job.company && job.company.companyName}
                  meta={job.position}
                  description={job.description}
                />
              </div>
            ))}
        </div>
      </Container>
    );
  }
}

export default Homepage;

const Head = styled.h1`
  text-align: center;
  font-size: 75px;
`;

const Container = styled.div`
  background-color: #ececec;
  min-height: 100vh;
`;
