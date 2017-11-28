import React, { Component } from "react";
import api from "../../api/applicationCrud.js";

class ApplicationForm extends Component {
  constructor(props) {
    super(props);

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
      jobId: props.match.params.jobId
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
            placeholder={"First Name"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"lastName"}
            placeholder={"Last Name"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"address"}
            placeholder={"Address"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"city"}
            placeholder={"City"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"state"}
            placeholder={"state"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"zip"}
            placeholder={"zip"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"phone"}
            placeholder={"phone"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"email"}
            placeholder={"email"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"date"}
            placeholder={"date"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"education"}
            placeholder={"education"}
            value={this.state.education}
            options={[
              { text: "highschool", value: "highschool" },
              { text: "GED", value: "GED" },
              { text: "college", value: "college" }
            ]}
            onChange={this.onInputChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default ApplicationForm;
