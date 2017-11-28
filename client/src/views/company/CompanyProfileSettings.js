import React, { Component } from "react";
import api from "../../api/companyCrud";

class CompanyProfileSettings extends Component {
  constructor() {
    super();

    this.state = {
      logo: "",
      description: "",
      industry: ""
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

    let companyId = this.props.match.params.id;
    api.update(companyId, this.state).then(() => {
      this.props.history.push("/company/profile");
    });
  };

  render() {
    console.log(localStorage);

    return (
      <div>
        <h1>Company Profile Settings</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text"
            name={"logo"}
            placeholder={"Logo"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"description"}
            placeholder={"Description"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"industry"}
            placeholder={"Industry"}
            onChange={this.onInputChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default CompanyProfileSettings;

// not working yet
