import React, { Component } from "react";
import applicant from "../api/applicantCrud";
import jobs from "../api/jobCrud";

class JobDescriptionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    let { jobId } = this.props.match.params;
    jobs.getById(jobId).then(job => {
      this.setState(state => ({
        ...job
      }));
    });
  }

  interested = jobId => {
    applicant.addJob(jobId).then(() => {
      this.props.history.push("/applicant/profile");
    });
  };

  render() {
    let { jobId } = this.props.match.params;
    console.log(this.state);
    let {
      company = {},
      description = "",
      position = "",
      payRate = "",
      experience = ""
    } = this.state;

    return (
      <div>
        <h1>JobDescriptionPage</h1>
        <h3>Company: {company.companyName} </h3>
        <h4>Position: {position} </h4>
        <p>
          {" "}
          <b>Description:</b> {description}{" "}
        </p>
        <p>
          {" "}
          <b>Payrate:</b> ${payRate}{" "}
        </p>
        <p>
          {" "}
          <b>Experience:</b> {experience}{" "}
        </p>
        <button onClick={() => this.interested(jobId)}>Interested?</button>
        <button
          onClick={() => this.props.history.push("/applicant/applicationform")}
        >
          Apply!
        </button>
      </div>
    );
  }
}

export default JobDescriptionPage;
