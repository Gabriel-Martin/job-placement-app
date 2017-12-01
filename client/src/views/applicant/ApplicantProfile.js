import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icon, Popup, Button } from "semantic-ui-react";
import apiApplicant from "../../api/applicantCrud";
import apiJob from "../../api/jobCrud";
import NavBar from "../../components/NavBar";
import apiApp from "../../api/applicationCrud";

class ApplicantProfile extends Component {
  constructor() {
    super();

    this.state = {
      applicant: {}
    };
  }

  componentDidMount() {
    apiApplicant.getCurrent().then(applicant => {
      this.setState(state => {
        return {
          userType: localStorage.getItem("userType"),
          applicant: applicant
        };
      });
    });
  }

  removeJob = (applicantId, jobId) => {
    apiApplicant.removeJob(applicantId, jobId).then(() => {
      apiApplicant.getCurrent().then(applicant => {
        this.setState(state => {
          return {
            userType: localStorage.getItem("userType"),
            applicant: applicant
          };
        });
      });
    });
  };

  deleteApp = appId => {
    apiApp.remove(appId).then(() => {
      apiApplicant.getCurrent().then(applicant => {
        this.setState(state => {
          return {
            userType: localStorage.getItem("userType"),
            applicant: applicant
          };
        });
      });
    });
  };

  render() {
    let { applicant, userType } = this.state;
    let applied = [];
    let processing = [];
    let status = [];

    // filtering all applications and assigning
    // to array based on 'status' property
    if (applicant.applications) {
      applied = applicant.applications.filter(
        app => app.applicationStatus === "applied"
      );
    }

    if (applicant.applications) {
      processing = applicant.applications.filter(
        app => app.applicationStatus === "pending"
      );
    }

    if (applicant.applications) {
      status = applicant.applications.filter(
        app =>
          app.applicationStatus === "hired" ||
          app.applicationStatus === "declined"
      );
    }

    console.log(applied);

    return (
      <Container>
        <NavBar userType={userType} />
        <Column>
          <div>
            <SLink to={`/applicant/profile/settings/${applicant.id}`}>
              Settings &nbsp;&nbsp;
              <Icon size={"large"} name={"settings"} />
            </SLink>
          </div>
          <Center>
            <Title>{applicant.firstName}'s Profile</Title>
            <Img src={applicant.image} />
          </Center>
          <div />
        </Column>

        <AllCards>
          <Card>
            <Head3>Interested</Head3>

            {applicant.jobs &&
              applicant.jobs.map(j => (
                <MiniCard key={j.id}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => this.props.history.push(`/jobs/${j.id}`)}
                    >
                      {j.position}
                    </div>
                    <div>
                      <Popup
                        header={"Delete Job?"}
                        trigger={
                          <Icon
                            style={{ margin: "0px 4px", cursor: "pointer" }}
                            name={"trash"}
                            size={"small"}
                          />
                        }
                        content={
                          <Button
                            onClick={() => this.removeJob(applicant.id, j.id)}
                            color="negative"
                            content="Confirm"
                          />
                        }
                        on="click"
                        position="top left"
                      />
                    </div>
                  </div>
                </MiniCard>
              ))}
          </Card>

          <Card>
            <Head3>Applied</Head3>
            {applied.map(j => (
              <MiniCard key={j.id}>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => this.props.history.push(`/jobs/${j.jobId}`)}
                  >
                    {j.job && j.job.position}
                  </div>
                  <div>
                    <Popup
                      header={"Delete Job?"}
                      trigger={
                        <Icon
                          style={{ margin: "0px 4px", cursor: "pointer" }}
                          name={"trash"}
                          size={"small"}
                        />
                      }
                      content={
                        <Button
                          onClick={() => this.deleteApp(j.id)}
                          color="negative"
                          content="Confirm"
                        />
                      }
                      on="click"
                      position="top left"
                    />
                  </div>
                </div>
              </MiniCard>
            ))}
          </Card>

          <Card>
            <Head3>Processing</Head3>
            {processing.map(j => (
              <MiniCard key={j.id}>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => this.props.history.push(`/jobs/${j.jobId}`)}
                  >
                    {j.job && j.job.position}
                  </div>
                  <div>
                    <Popup
                      header={"Delete Job?"}
                      trigger={
                        <Icon
                          style={{ margin: "0px 4px", cursor: "pointer" }}
                          name={"trash"}
                          size={"small"}
                        />
                      }
                      content={
                        <Button
                          onClick={() => this.deleteApp(j.id)}
                          color="negative"
                          content="Confirm"
                        />
                      }
                      on="click"
                      position="top left"
                    />
                  </div>
                </div>
              </MiniCard>
            ))}
          </Card>

          <Card>
            <Head3>Status</Head3>
            {status.map(j => (
              <MiniCard key={j.id}>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => this.props.history.push(`/jobs/${j.jobId}`)}
                  >
                    {j.job && j.job.position}
                  </div>
                  {j.applicationStatus === "hired" && (
                    <Icon name={"check"} color={"green"} />
                  )}
                  {j.applicationStatus === "declined" && (
                    <Icon name={"delete"} color={"red"} />
                  )}
                  <div>
                    <Popup
                      header={"Delete Job?"}
                      trigger={
                        <Icon
                          style={{ margin: "0px 4px", cursor: "pointer" }}
                          name={"trash"}
                          size={"small"}
                        />
                      }
                      content={
                        <Button
                          onClick={() => this.deleteApp(j.id)}
                          color="negative"
                          content="Confirm"
                        />
                      }
                      on="click"
                      position="top left"
                    />
                  </div>
                </div>
              </MiniCard>
            ))}
          </Card>
        </AllCards>
      </Container>
    );
  }
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const SLink = styled(Link)`
  float: right;
  margin: 15px;
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
`;

const Title = styled.div.attrs({ className: "avenir fw1 f1 " })`
  font-size: 50px;
  padding: 20px;
  text-align: center;
`;

const Img = styled.img`
  border-radius: 50%;
  height: 75px;
`;

const Container = styled.div`
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
`;

const MiniCard = styled.div`
  background-color: #ebedee;
  margin: 5px;
  border-radius: 5px;
  padding: 15px;
  margin: 5px;
  font-size: 18px;
  text-align: center;
  word-wrap: break-word;
`;

const Card = styled.div`
  display: flex;
  border-top: 6px solid #1ba39c;
  border-radius: 10px;
  flex-direction: column;
  width: 20%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const AllCards = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Head3 = styled.h3.attrs({ className: "avenir fw1 f4 " })`
  text-align: center;
  font-size: 30px;
`;
export default ApplicantProfile;
