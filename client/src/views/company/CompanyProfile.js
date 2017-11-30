import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import apiCompany from "../../api/companyCrud";
import apiCheckUser from "../../api/checkUserCrud";
import apiJob from "../../api/jobCrud";
import { Button, Icon } from "semantic-ui-react";

import NavBar from "../../components/NavBar";

class CompanyProfile extends Component {
  constructor() {
    super();

    this.state = {
      company: {},
      userType: ""
    };
  }

  componentDidMount() {
    apiCompany.getCurrentCompany().then(company => {
      this.setState(state => ({
        company: company,
        userType: localStorage.getItem("userType")
      }));
    });
  }

  deleteJob = jobId => {
    apiJob.remove(jobId).then(() => {
      apiCompany.getCurrentCompany().then(company => {
        this.setState(state => ({
          company: company,
          userType: localStorage.getItem("userType")
        }));
      });
    });
  };

  render() {
    let { company, userType } = this.state;

    return (
      <Container>
        <NavBar userType={userType} />

        <Column>
          <div>
            <SLink to={`/company/profile/settings/${company.id}`}>
              Settings &nbsp;&nbsp;
              <Icon size={"large"} name={"settings"} />
            </SLink>
          </div>
          <Center>
            <Title>{company.companyName}'s Profile</Title>
            <Img src={company.logo} />
          </Center>
          <Center>
            <div>{company.description}</div>
          </Center>
          <Center>
            <div>{company.industry}</div>
          </Center>
        </Column>

        <AllCards>
          {company.jobs &&
            company.jobs.map(job => (
              <Card key={job.id}>
                <div style={{ backgroundColor: "#568EA3", padding: "5px 0px" }}>
                  <Icon
                    onClick={() => this.deleteJob(job.id)}
                    style={{ margin: "0px 4px" }}
                    title={"Delete"}
                    size={"large"}
                    name={"trash"}
                  />
                  <Icon
                    onClick={() =>
                      this.props.history.push(`/job/edit/${job.id}`)}
                    style={{ margin: "0px 4px" }}
                    title={"Edit"}
                    size={"large"}
                    name={"edit"}
                  />
                </div>
                <div
                  onClick={() =>
                    this.props.history.push(`/company/dashboard/${job.id}`)}
                  style={{ overflow: "auto", padding: "5px" }}
                >
                  <h3> {job.position} </h3>
                  <p> {job.description} </p>
                </div>
              </Card>
            ))}
        </AllCards>
      </Container>
    );
  }
}

// <AllCards>
// {company.jobs &&
//   company.jobs.map(job => (
//     <Card
//       key={job.id}
//       onClick={() =>
//         this.props.history.push(`/company/dashboard/${job.id}`)}
//     >
//       <h3> {job.position} </h3>
//       <p> {job.description} </p>

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const SLink = styled(Link)`
  float: right;
  margin: 15px;
`;

const Container = styled.div`
  background-color: #ececec;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  display: flex;
  margin: 10px;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  width: 300px;
  height: 200px;
`;

const AllCards = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-flow: row wrap;
  padding: 10px !important;
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

export default CompanyProfile;
