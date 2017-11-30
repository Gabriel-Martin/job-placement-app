import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import NavBar from "../../components/NavBar";
import ApplicationKanban from "../../components/ApplicationKanban";

import apiJobs from "../../api/jobCrud";
import application from "../../api/applicationCrud";

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
  width: 1000px;
  text-align: center;
`;

const Container = styled.div`
  background-color: #ececec;
  min-height: 100vh;
`;

const Title = styled.div.attrs({ className: "avenir fw1 f1 " })`
  padding: 20px;
`;

export default CompanyDashboard;

// <div style={{ display: "flex", justifyContent: "space-around" }}>
// <div
//   style={{
//     display: "flex",
//     flexDirection: "column",
//     border: "1px solid black",
//     width: "20%",
//     height: "100vh"
//   }}
// >
//   <h3>All Applications</h3>
//   <div>
//     {applications.map(app => (
//       <div key={app.id}>
//         Name:
//         <Link to={`/company/application/${app.id}`}>
//           {app.firstName} {app.lastName}
//         </Link>
//       </div>
//     ))}
//   </div>
// </div>
// <div
//   style={{
//     display: "flex",
//     flexDirection: "column",
//     border: "1px solid black",
//     width: "20%",
//     height: "100vh"
//   }}
// >
//   <h3>Interested</h3>
// </div>
// <div
//   style={{
//     display: "flex",
//     flexDirection: "column",
//     border: "1px solid black",
//     width: "20%",
//     height: "100vh"
//   }}
// >
//   <h3>Processing</h3>
// </div>
// <div
//   style={{
//     display: "flex",
//     flexDirection: "column",
//     border: "1px solid black",
//     width: "20%",
//     height: "100vh"
//   }}
// >
//   <h3>Hired</h3>
// </div>
// </div>
