import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import apiApplicant from "../../api/applicantCrud";
import apiJob from "../../api/jobCrud";
import NavBar from "../../components/NavBar";

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
              Applicant Settings &nbsp;&nbsp;
              <Icon size={"large"} name={"settings"} />
            </SLink>
          </div>
          <Center>
            <Title>{applicant.firstName}'s Profile</Title>
            <Img src={applicant.image} />
          </Center>
        </Column>
        <AllCards>
          <Card>
            <Head3>Interested</Head3>

            {applicant.jobs &&
              applicant.jobs.map(j => (
                <MiniCard key={j.id}>{j.position}</MiniCard>
              ))}
          </Card>
          <Card>
            <Head3>Applied</Head3>
            {applied.map(j => (
              <MiniCard key={j.id}>{j.job && j.job.position}</MiniCard>
            ))}
          </Card>
          <Card>
            <Head3>Processing</Head3>
            {processing.map(j => (
              <MiniCard key={j.id}>{j.job && j.job.position}</MiniCard>
            ))}
          </Card>
          <Card>
            <Head3>Status</Head3>
            {status.map(j => (
              <MiniCard key={j.id}>
                {j.job && j.job.position}
                {j.applicationStatus === "hired" && (
                  <Icon name={"check"} color={"green"} />
                )}
                {j.applicationStatus === "declined" && (
                  <Icon name={"delete"} color={"red"} />
                )}
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

const Container = styled.div`background-color: #ececec;`;

const MiniCard = styled.div`
  background-color: #f8f8ff;
  border-radius: 5px;
  padding: 15px;
  margin: 10px;
  font-size: 18px;
  text-align: center;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100vh;
  border: 5px solid #bdc3c7;
  border-radius: 10px;
  background-color: #bdc3c7;
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
