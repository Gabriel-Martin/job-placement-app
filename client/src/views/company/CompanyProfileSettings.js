import React, { Component } from "react";
import apiCompany from "../../api/companyCrud";
import { Form, Input } from "semantic-ui-react";
import styled from "styled-components";
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
    apiCompany.update(companyId, this.state.company).then(() => {
      this.props.history.push("/company/profile");
    });
  };

  componentDidMount() {
    apiCompany.getCurrentCompany().then(company => {
      this.setState(state => ({
        userType: localStorage.getItem("userType"),
        company: company
      }));
    });
  }

  render() {
    let { userType, company } = this.state;
    console.log(this.state);

    return (
      <Container>
        <NavBar userType={userType} />
        <Body>
          <h1>Company Profile Settings</h1>
          <Form onSubmit={this.onFormSubmit}>
            <Form.Input
              type="text"
              name={"logo"}
              placeholder={"Logo"}
              value={company.logo}
              onChange={this.onInputChange}
            />
            <Form.Input
              type="text"
              name={"description"}
              placeholder={"Description"}
              value={company.description}
              onChange={this.onInputChange}
            />
            <Form.Input
              type="text"
              name={"industry"}
              placeholder={"Industry"}
              value={company.industry}
              onChange={this.onInputChange}
            />
            <Form.Input type="submit" />
          </Form>
        </Body>
      </Container>
    );
  }
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Container = styled.div`
  background-color: #ececec;
`;

export default CompanyProfileSettings;
