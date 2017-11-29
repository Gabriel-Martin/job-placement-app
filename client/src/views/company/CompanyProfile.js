import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import apiCompany from "../../api/companyCrud";
import apiCheckUser from "../../api/checkUserCrud";

import NavBar from "../../components/NavBar";

class CompanyProfile extends Component {
  constructor() {
    super();

    this.state = {};
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
    let { id = "", jobs = [], userType = "" } = this.state;

    return (
      <div>
        <NavBar userType={userType} />
        <Link to={`/company/profile/settings/${id}`}>Company Settings</Link>
        <h1>CompanyProfile</h1>
        {jobs.map(job => (
          <div
            style={{ border: "1px solid black", margin: "5px", padding: "5px" }}
            key={job.id}
            onClick={() =>
              this.props.history.push(`/company/dashboard/${job.id}`)}
          >
            <h3> {job.position} </h3>
            <p> {job.description} </p>
          </div>
        ))}
      </div>
    );
  }
}

export default CompanyProfile;
