import React, { Component } from "react";
import styled from "styled-components";
import application from "../../api/applicationCrud";

class CompanyApplication extends Component {
  constructor() {
    super();

    this.state = {
      applications: {}
    };
  }

  componentDidMount() {
    let appId = this.props.match.params.applicationId;
    application.getById(appId).then(data => {
      this.setState(state => {
        return {
          applications: data
        };
      });
    });
  }

  render() {
    console.log(this.state.applications);
    let { applications } = this.state;
    return (
      <Containter>
        <Title>Application</Title>
        <Card>
          <TextStyle>
            <div>
              Name:
              {applications.firstName} {applications.lastName}
            </div>
          </TextStyle>
          <TextStyle>
            <div>Address: {applications.address}</div>
          </TextStyle>
          <TextStyle>
            <div>City: {applications.city}</div>
          </TextStyle>
          <TextStyle>
            <div>State: {applications.state}</div>
          </TextStyle>
          <TextStyle>
            <div>Zip: {applications.zip}</div>
          </TextStyle>
          <TextStyle>
            <div>Email: {applications.email}</div>
          </TextStyle>
          <TextStyle>
            <div>Phone: {applications.phone}</div>
          </TextStyle>
          <TextStyle>
            <div>Education: {applications.education}</div>
          </TextStyle>
        </Card>
      </Containter>
    );
  }
}

const Card = styled.div`
  border: 275px solid #fff;
  margin: 10px auto;
  border-radius: 15px;
  background-color: #fff;
`;

const Containter = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background-color: #ececec;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 60px;
  text-align: center;
`;

const TextStyle = styled.div`padding: 5px;`;

export default CompanyApplication;
