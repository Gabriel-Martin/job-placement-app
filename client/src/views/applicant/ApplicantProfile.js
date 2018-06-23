import React, { Component } from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";

import NavBar from "../../components/NavBar";
import apiApp from "../../api/applicationCrud";
import apiApplicant from "../../api/applicantCrud";

import { Icon, Popup, Button } from "semantic-ui-react";

class ApplicantProfile extends Component {
  constructor() {
    super();

    this.state = {
      applicant: {}
    };
  }

  componentDidMount() {
    const userType = localStorage.getItem("userType");

    apiApplicant.getCurrent().then(applicant => {
      this.setState(state => {
        return {
          userType: userType,
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
                    style={{ cursor: "pointer" }}
                    onClick={() => this.props.history.push(`/jobs/${j.id}`)}
                  >
                    {j.position}
                  </div>
                  <div style={{ marginLeft: "5px" }}>
                    <Popup
                      header={"Delete Job?"}
                      trigger={
                        <Icon
                          style={{ marginLeft: "auto", cursor: "pointer" }}
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
                </MiniCard>
              ))}
          </Card>

          <Card>
            <Head3>Applied</Head3>
            {applied.map(j => (
              <MiniCard key={j.id}>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => this.props.history.push(`/jobs/${j.jobId}`)}
                >
                  {j.job && j.job.position}
                </div>
                <Popup
                  header={"Delete Job?"}
                  trigger={<Icon name={"trash"} size={"small"} />}
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
              </MiniCard>
            ))}
          </Card>

          <Card>
            <Head3>Status</Head3>
            {status.map(j => (
              <MiniCard key={j.id}>
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
  margin-bottom: 1.5rem;
  justify-content: center;
`;

const Title = styled.div.attrs({ className: "avenir fw1 f1 " })`
  padding: 20px;
  font-size: 50px;
  text-align: center;
`;

const Img = styled.img`
  height: 75px;
  border-radius: 50%;
`;

const Container = styled.div`
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
`;

const MiniCard = styled.div`
  margin: 5px;
  margin: 5px;
  display: flex;
  padding: 15px;
  font-size: 18px;
  border-radius: 5px;
  word-wrap: break-word;
  min-height: fit-content;
  justify-content: center;
  background-color: #ebedee;
`;

const DeleteButton = styled(Button)`
  margin-left: auto;
`;

const Card = styled.div`
  flex: 1;
  display: flex;
  margin: 0 1.5rem;
  min-height: 100vh;
  border-radius: 10px;
  flex-direction: column;
  border-top: 6px solid #1ba39c;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  @media screen and (max-width: 850px) {
    margin: 1.5rem 0;
    min-height: 12rem;
  }
`;

const AllCards = styled.div`
  display: flex;
  padding: 0 1.5rem;
  justify-content: center;

  @media screen and (max-width: 850px) {
    flex-direction: column;
  }
`;

const Head3 = styled.h3.attrs({ className: "avenir fw1 f4 " })`
  font-size: 30px;
  text-align: center;
`;

export default ApplicantProfile;
