import React, { Component } from "react";
import apiApplicant from "../api/applicantCrud";
import apiJobs from "../api/jobCrud";

import NavBar from "../components/NavBar";

class JobDescriptionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    let { jobId } = this.props.match.params;
    apiJobs.getById(jobId).then(job => {
      this.setState(state => ({
        ...job
      }));
    });
  }

  interested = jobId => {
    apiApplicant.addJob(jobId).then(() => {
      this.props.history.push("/applicant/profile");
    });
  };

  render() {
    let { jobId } = this.props.match.params;

    let {
      company = {},
      description = "",
      position = "",
      payRate = "",
      experience = ""
    } = this.state;

    return (
      <div>
        <NavBar />
        <h1>JobDescriptionPage</h1>
        <h3>Company: {company.companyName} </h3>
        <h4>Position: {position} </h4>
        <p>
          <b>Description:</b> {description}
        </p>
        <p>
          <b>Payrate:</b> ${payRate}
        </p>
        <p>
          <b>Experience:</b> {experience}
        </p>
        <button onClick={() => this.interested(jobId)}>Interested?</button>
        <button
          onClick={() =>
            this.props.history.push(`/applicant/applicationform/${jobId}`)}
        >
          Apply!
        </button>
      </div>
    );
  }
}

export default JobDescriptionPage;
