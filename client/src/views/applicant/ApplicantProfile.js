import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
    console.log(this.state);

    // filtering all applications and assigning
    // to array based on 'status' property
    if (applicant.applications) {
      let applied = applicant.applications.filter(
        app => app.applicationStatus === "applied"
      );
    }

    if (applicant.applications) {
      let processing = applicant.applications.filter(
        app => app.applicationStatus === "pending"
      );
    }

    if (applicant.applications) {
      let status = applicant.applications.filter(
        app =>
          app.applicationStatus === "hired" ||
          app.applicationStatus === "declined"
      );
    }

    return (
      <Container>
        <NavBar userType={userType} />
        <div>
          <SLink to={`/applicant/profile/settings/${applicant.id}`}>
            Applicant Settings
          </SLink>
        </div>
        <Center>
          <Title>{applicant.firstName}'s Profile</Title>
          <Img src={applicant.image} />
        </Center>
        <AllCards>
          <Card>
            <Head3>Interested</Head3>

            <MiniCard>
              {applicant.jobs &&
                applicant.jobs.map(j => <div key={j.id}>{j.position}</div>)}
            </MiniCard>
          </Card>
          <Card>
            <Head3>Applied</Head3>
            <MiniCard>
              {applicant.jobs &&
                applicant.jobs.map(j => <div key={j.id}>{j.position}</div>)}
            </MiniCard>
          </Card>
          <Card>
            <Head3>Processing</Head3>
          </Card>
          <Card>
            <Head3>Status</Head3>
          </Card>
        </AllCards>
      </Container>
    );
  }
}

const SLink = styled(Link)`
  float: right;
  padding: 15px;
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 15px;
`;

const Title = styled.div.attrs({ className: "avenir fw1 f1 " })`
  font-size: 50px;
  padding: 20px;
`;

const Img = styled.img`
  border-radius: 50%;
  height: 75px;
`;

const Container = styled.div`background-color: #ececec;`;

const MiniCard = styled.div`
  border: 1px solid #fff;
  background-color: #f8f8ff;
  border-radius: 5px;
  padding: 15px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100vh;
  border: 15px solid #bdc3c7;
  border-radius: 15px;
  background-color: #bdc3c7;
`;

const AllCards = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Head3 = styled.h3`
  text-align: center;
  font-size: 30px;
`;
export default ApplicantProfile;
