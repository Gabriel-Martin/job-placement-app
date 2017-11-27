import React, { Component } from "react";

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
    eventChangeApp.persist();
  };

  onFormSubmitCompany = eventChangeComp => {
    eventChangeComp.persist();
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
