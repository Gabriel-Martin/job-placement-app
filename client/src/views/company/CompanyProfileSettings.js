import React, { Component } from "react";
import apiCompany from "../../api/companyCrud";

import NavBar from "../../components/NavBar";

class CompanyProfileSettings extends Component {
  constructor() {
    super();

    this.state = {
      userType: "",
      company: {
        logo: "",
        description: "",
        industry: ""
      }
    };
  }

  componentDidMount() {
    apiCompany.getCurrentCompany().then(company => {
      this.setState(state => ({
        ...state,
        userType: localStorage.getItem("userType"),
        company: {
          ...company
        }
      }));
    });
  }

  onInputChange = changeEvent => {
    changeEvent.persist();

    this.setState(state => {
      return {
        ...state,
        company: {
          ...state.company,
          [changeEvent.target.name]: changeEvent.target.value
        }
      };
    });
  };

  onFormSubmit = submitEvent => {
    submitEvent.preventDefault();

    let companyId = this.props.match.params.companyId;
    apiCompany.update(companyId, this.state).then(() => {
      this.props.history.push("/company/profile");
    });
  };

  render() {
    let { userType, company } = this.state;
    console.log(company);
    return (
      <div>
        <NavBar userType={userType} />
        <h1>Company Profile Settings</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text"
            name={"logo"}
            placeholder={"Logo"}
            value={company.logo}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"description"}
            placeholder={"Description"}
            value={company.description}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"industry"}
            placeholder={"Industry"}
            value={company.industry}
            onChange={this.onInputChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default CompanyProfileSettings;
