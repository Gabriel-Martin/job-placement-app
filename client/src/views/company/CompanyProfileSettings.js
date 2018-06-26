import React, { Component } from "react";
import apiCompany from "../../api/companyCrud";
import { Form, Button, Icon } from "semantic-ui-react";
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
        industry: "",
        email: ""
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

    return (
      <div>
        <NavBar userType={userType} />
        <Container>
          <Title>
            Settings <Icon name={"settings"} />
          </Title>
          <SettingForm onSubmit={this.onFormSubmit}>
            <Form.Input
              type="text"
              label={"Email"}
              name={"email"}
              placeholder={"email"}
              value={company.email}
              onChange={this.onInputChange}
              required
            />
            <Form.Input
              type="text"
              label={"Logo"}
              name={"logo"}
              placeholder={"Logo"}
              value={company.logo}
              onChange={this.onInputChange}
            />
            <Form.TextArea
              type="text"
              label={"Description of your Company"}
              name={"description"}
              placeholder={"Description"}
              value={company.description}
              onChange={this.onInputChange}
              required
            />
            <Form.Input
              type="text"
              label={"Industry"}
              name={"industry"}
              placeholder={"Industry"}
              value={company.industry}
              onChange={this.onInputChange}
              required
            />
            <Button color={"instagram"} type="submit">
              Submit
            </Button>
          </SettingForm>
        </Container>
      </div>
    );
  }
}

const Title = styled.h1.attrs({ className: "avenir fw1 f1 " })``;

const Container = styled.div`
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SettingForm = styled(Form)`
  width: 88%;
  padding: 20px;
`;

export default CompanyProfileSettings;
