import React, { Component } from "react";
import api from "../../api/applicationCrud.js";

class ApplicationForm extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      email: "",
      date: "",
      education: "highschool",
      applicationStatus: "applied",
      jobId: "1d4bf836-9384-45f9-95e3-2daf10bd448f"
    };
  }

  onInputChange = changeEvent => {
    changeEvent.persist();

    this.setState(state => {
      return {
        ...state,
        [changeEvent.target.name]: changeEvent.target.value
      };
    });
  };

  onFormSubmit = submitEvent => {
    submitEvent.preventDefault();

    api.create(this.state).then(data => {
      this.props.history.push("/applicant/profile");
      // add Application to Applicant
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>ApplicationForm</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text"
            name={"firstName"}
            placeholder={"info"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"lastName"}
            placeholder={"info"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"address"}
            placeholder={"info"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"city"}
            placeholder={"info"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"state"}
            placeholder={"info"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"zip"}
            placeholder={"info"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"phone"}
            placeholder={"info"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"email"}
            placeholder={"info"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"date"}
            placeholder={"info"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"education"}
            placeholder={"info"}
            value={this.state.education}
            onChange={this.onInputChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default ApplicationForm;
