import React, { Component } from "react";
import styled from "styled-components";
import { Table } from "semantic-ui-react";
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
                  width: "450px",
                  padding: "5px"
                }}
              >
                <Card>
                  <div
                    style={{
                      backgroundColor: "#4b79a1",
                      padding: "5px 4px",
                      borderRadius: "5px"
                    }}
                  >
                    <h2>{job.company && job.company.companyName}</h2>
                  </div>
                  <div
                    onClick={() => this.props.history.push(`/jobs/${job.id}`)}
                    className={"noscrollbar"}
                    style={{
                      overflow: "auto",
                      wordWrap: "break-word",
                      padding: "5px",
                      cursor: "pointer",
                      height: "100%"
                    }}
                  >
                    <h3> {job.position} </h3>
                    <p> {job.description} </p>
                  </div>
                </Card>
              </div>
            ))}
        </div>
      </Container>
    );
  }
}

export default Homepage;

const Head = styled.h1.attrs({ className: "avenir fw1 f1 " })`
  text-align: center;
  font-size: 75px;
`;

const Container = styled.div`
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  min-height: 100vh;
`;

const Card = styled.div`
  display: flex;
  margin: 5px;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  height: 200px;
`;
