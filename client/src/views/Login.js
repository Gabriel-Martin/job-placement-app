import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      login: true,
      applicant: {
        email: "",
        password: ""
      },
      company: {
        email: "",
        password: ""
      }
    };
  }

  showSignup = () => {
    let login = this.state.login;
    if (login === true) {
      return this.setState(state => {
        return {
          login: false
        };
      });
    }

    if (login === false) {
      return this.setState(state => {
        return {
          login: true
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
    let login = this.state.login;
    return (
      <div style={styles.PageStyle}>
        {login ? (
          <div>
            <button onClick={() => this.showSignup()}>Company Login</button>
            <h3>Applicant Login</h3>
            <form style={styles.AppForm} onSubmit={this.onFormSubmitApplicant}>
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
            <button onClick={() => this.showSignup()}>Applicant Login</button>
            <h3>Company Login</h3>
            <form style={styles.CompForm} onSubmit={this.onFormSubmitCompany}>
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

export default Login;
