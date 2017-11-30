import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import apiCompany from "../../api/companyCrud";
import apiCheckUser from "../../api/checkUserCrud";

import NavBar from "../../components/NavBar";

class CompanyProfile extends Component {
  constructor() {
    super();

    this.state = {
      company: {}
    };
  }

  componentDidMount() {
    apiCompany.getCurrentCompany().then(company => {
      this.setState(state => ({
        ...company,
        userType: localStorage.getItem("userType")
      }));
    });
  }

  render() {
    console.log(this.state);
    let { id = "", jobs = [], userType = "" } = this.state;

    return (
      <Container>
        <NavBar userType={userType} />
        <Link to={`/company/profile/settings/${id}`}>Company Settings</Link>
        <Center>
          <Title>{this.state.companyName}'s Profile</Title>
          <Img src={this.state.company.logo} />
        </Center>
        <Center>
          <div>{this.state.company.description}</div>
        </Center>
        <Center>
          <div>{this.state.company.industry}</div>
        </Center>
        <AllCards>
          {jobs.map(job => (
            <Card
              key={job.id}
              onClick={() =>
                this.props.history.push(`/company/dashboard/${job.id}`)}
            >
              <h3> {job.position} </h3>
              <p> {job.description} </p>
            </Card>
          ))}
        </AllCards>
      </Container>
    );
  }
}

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
  border: 15px solid #fff;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  width: 300px;
  height: 200px;
  overflow: auto;
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
