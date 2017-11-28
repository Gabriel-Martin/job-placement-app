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

  componentDidMount() {
    api.getCurrentCompany().then(company => {
      this.setState(state => ({
        ...company
      }));
    });
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

    let companyId = this.props.match.params.companyId;
    api.update(companyId, this.state).then(() => {
      this.props.history.push("/company/profile");
    });
  };

  render() {
    return (
      <div>
        <h1>Company Profile Settings</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text"
            name={"logo"}
            placeholder={"Logo"}
            value={this.state.logo}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"description"}
            placeholder={"Description"}
            value={this.state.description}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"industry"}
            placeholder={"Industry"}
            value={this.state.industry}
            onChange={this.onInputChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default CompanyProfileSettings;
