import React, { Component } from "react";

import styled from "styled-components";
import apiJobs from "../../api/jobCrud";
import application from "../../api/applicationCrud";

import NavBar from "../../components/NavBar";
import ApplicationKanban from "../../components/ApplicationKanban";

class CompanyDashboard extends Component {
  constructor() {
    super();

    this.state = {};
  }

  editJob = () => {
    this.props.history.push(`/job/edit/${this.state.id}`);
  };

  fetchJob = () => {
    let { jobId } = this.props.match.params;
    apiJobs.getById(jobId).then(job => {
      this.setState(state => ({
        ...job,
        userType: localStorage.getItem("userType")
      }));
    });
  };

  componentDidMount() {
    this.fetchJob();
  }

  handleStatusChange = app => {
    let apps = [...this.state.applications];
    let idx = -1;

    apps.find((a, i) => {
      if (a.id === app.id) {
        idx = i;
        return true;
      }
      return false;
    });

    if (idx === -1) {
      return;
    }

    apps[idx] = app;

    this.setState(
      state => {
        return {
          applications: apps
        };
      },
      () => {
        // update application in api
        application
          .update(app.id, app)
          .then(result => {
            if (result.error) {
              alert("unable to update");
              this.fetchJob();
            }
          })
          .catch(err => {
            alert("unable to update");
            this.fetchJob();
          });
      }
    );
  };

  render() {
    let {
      userType,
      position = "",
      description = "",
      applications = []
    } = this.state;

    return (
      <div>
        <NavBar userType={userType} />
        <Container>
          <Center>
            <Title>Company Dashboard</Title>
            <h3>Position: {position} </h3>
            <Width>Description: {description} </Width>
          </Center>

          <div>
            <ApplicationKanban
              applications={applications}
              onStatusChange={this.handleStatusChange}
            />
          </div>
        </Container>
      </div>
    );
  }
}

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
`;

const Width = styled.p`
  width: 100%;
  text-align: center;
`;

const Container = styled.div`
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  min-height: 100vh;
`;

const Title = styled.h2.attrs({ className: "avenir fw1 f1 " })`
  padding: 20px;
`;

export default CompanyDashboard;
