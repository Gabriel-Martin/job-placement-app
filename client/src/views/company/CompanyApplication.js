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
        <div>
          Name:
          {applications.firstName} {applications.lastName}
        </div>
        <div>Address: {applications.address}</div>
        <div>City: {applications.city}</div>
        <div>State: {applications.state}</div>
        <div>Zip: {applications.zip}</div>
        <div>Email: {applications.email}</div>
        <div>Phone: {applications.phone}</div>
        <div>Education: {applications.education}</div>
      </Containter>
    );
  }
}

const Containter = styled.div`
  background-color: #d3d3d3;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 100px;
  text-align: center;
`;

export default CompanyApplication;
