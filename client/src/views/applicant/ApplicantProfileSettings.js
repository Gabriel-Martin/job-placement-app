import React, { Component } from "react";

import apiApplicant from "../../api/applicantCrud";

import NavBar from "../../components/NavBar";

class ApplicantProfileSettings extends Component {
  constructor() {
    super();

    this.state = {
      userType: "",
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
      .then(data => this.props.history.push("/applicant/profile"));
  };

  componentDidMount() {
    apiApplicant.getCurrent().then(data => {
      this.setState(state => {
        return {
          userType: localStorage.getItem("userType"),
          applicant: {
            ...this.state.applicant,
            ...data
          }
        };
      });
    });
  }
  render() {
    let { applicant, userType } = this.state;

    return (
      <div>
        <NavBar userType={userType} />
        <h1>Applicant Profile Settings</h1>
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
