import React, { Component } from "react";

import { Link } from "react-router-dom";
import api from "../../api/companyCrud";

class CompanyProfile extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    api.getCurrentCompany().then(company => {
      this.setState(state => ({
        ...company
      }));
    });
  }

  render() {
    let { id = "", jobs = [] } = this.state;
    console.log(this.state);
    return (
      <div>
        <Link to={"/job/new"}>Post Job</Link>{" "}
        <Link to={`/company/profile/settings/${id}`}>Edit Company</Link>{" "}
        <Link to={`/job/new`}>Create Job</Link>
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
