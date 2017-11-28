import React, { Component } from "react";

import apiApplicant from "../../api/applicantCrud";

class ApplicantProfileSettings extends Component {
  constructor() {
    super();

    this.state = {
      applicant: {
        image: "",
        firstName: "",
        lastName: ""
      }
    };
  }

  componetDidMount() {
    let applicantId = this.props.match.params.applicantId;

    apiApplicant.getById(applicantId).then(data => console.log(data));
  }
  render() {
    return (
      <div>
        <h1>ApplicantProfileSettings</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text"
            name={"image"}
            onChange={this.onInputChange}
            placeholder={"Image"}
          />
          <input
            type="text"
            name={"firstName"}
            onChange={this.onInputChange}
            placeholder={"First Name"}
          />
          <input
            type="text"
            name={"lastName"}
            onChange={this.onInputChange}
            placeholder={"Last Name"}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default ApplicantProfileSettings;
