import React, { Component } from "react";

import apiCompany from "../api/companyCrud";
import apiApplicant from "../api/applicantCrud";

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      signup: true,
      applicant: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      },
      company: {
        companyName: "",
        email: "",
        password: ""
      }
    };
  }

  showSignup = () => {
    let signup = this.state.signup;
    if (signup === true) {
      return this.setState(state => {
        return {
          signup: false
        };
      });
    }

    if (signup === false) {
      return this.setState(state => {
        return {
          signup: true
        };
      });
    }
  };

  onInputChangeApplicant = eventChangeApp => {
    eventChangeApp.persist();

    this.setState(state => {
      return {
        applicant: {
          ...this.state.applicant,
          [eventChangeApp.target.name]: eventChangeApp.target.value
        }
      };
    });
  };

  onInputChangeCompany = eventChangeComp => {
    eventChangeComp.persist();

    this.setState(state => {
      return {
        company: {
          ...this.state.company,
          [eventChangeComp.target.name]: eventChangeComp.target.value
        }
      };
    });
  };

  onFormSubmitApplicant = eventChangeApp => {
    eventChangeApp.preventDefault();

    let applicant = this.state.applicant;

    apiApplicant.signUp(applicant).then(data => {
      if (data.err) {
        return alert(data.err);
      }
      if (!data.err) {
        this.props.history.push("/login");
      }
    });
  };

  onFormSubmitCompany = eventChangeComp => {
    eventChangeComp.preventDefault();

    let company = this.state.company;

    apiCompany.signUp(company).then(data => {
      if (data.err) {
        return alert(data.err);
      }
      if (!data.err) {
        this.props.history.push("/login");
      }
    });
  };

  render() {
    let signup = this.state.signup;
    return (
      <div style={styles.PageStyle}>
        {signup ? (
          <div>
            <button onClick={() => this.showSignup()}>Company Signup</button>
            <h3>Applicant Signup</h3>
            <form style={styles.AppForm} onSubmit={this.onFormSubmitApplicant}>
              <input
                type="text"
                name={"firstName"}
                placeholder={"First Name"}
                onChange={this.onInputChangeApplicant}
              />
              <input
                type="text"
                name={"lastName"}
                placeholder={"Last Name"}
                onChange={this.onInputChangeApplicant}
              />
              <input
                type="text"
                name={"email"}
                placeholder={"Email"}
                onChange={this.onInputChangeApplicant}
              />
              <input
                type="text"
                name={"password"}
                placeholder={"Password"}
                onChange={this.onInputChangeApplicant}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : (
          <div>
            <button onClick={() => this.showSignup()}>Applicant Signup</button>
            <h3>Company Signup</h3>
            <form style={styles.CompForm} onSubmit={this.onFormSubmitCompany}>
              <input
                type="text"
                name={"companyName"}
                placeholder={"Company Name"}
                onChange={this.onInputChangeCompany}
              />
              <input
                type="text"
                name={"email"}
                placeholder={"Email"}
                onChange={this.onInputChangeCompany}
              />
              <input
                type="text"
                name={"password"}
                placeholder={"Password"}
                onChange={this.onInputChangeCompany}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  AppForm: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 150
  },
  CompForm: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 150
  },
  PageStyle: {
    display: "flex",
    justifyContent: "center"
  }
};

export default Signup;
