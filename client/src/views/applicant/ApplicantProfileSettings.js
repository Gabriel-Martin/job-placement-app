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

  onInputChange = event => {
    event.persist();

    this.setState(state => {
      return {
        applicant: {
          ...this.state.applicant,
          [event.target.name]: event.target.value
        }
      };
    });
  };

  onFormSubmit = event => {
    event.preventDefault();

    apiApplicant
      .update(this.state.applicant.id, this.state.applicant)
      .then(data => console.log(data));
  };

  componentDidMount() {
    apiApplicant.getById().then(data => {
      this.setState(state => {
        return {
          applicant: {
            ...this.state.applicant,
            ...data
          }
        };
      });
    });
  }
  render() {
    let applicant = this.state.applicant;

    return (
      <div>
        <h1>ApplicantProfileSettings</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text"
            name={"image"}
            value={applicant.image}
            onChange={this.onInputChange}
            placeholder={"Image"}
          />
          <input
            type="text"
            name={"firstName"}
            value={applicant.firstName}
            onChange={this.onInputChange}
            placeholder={"First Name"}
          />
          <input
            type="text"
            name={"lastName"}
            value={applicant.lastName}
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
