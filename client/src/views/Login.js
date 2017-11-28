import React, { Component } from "react";

import apiCompany from "../api/companyCrud";
import apiApplicant from "../api/applicantCrud";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      login: true,
      email: "",
      password: ""
    };
  }

  onInputChange = eventChange => {
    eventChange.persist();

    this.setState(state => {
      return {
        ...this.state,
        [eventChange.target.name]: eventChange.target.value
      };
    });
  };

  changeLoginState = () => {
    let login = this.state.login;

    if (login === true) {
      this.setState(state => {
        return {
          login: false
        };
      });
    }

    if (login === false) {
      this.setState(state => {
        return {
          login: true
        };
      });
    }
  };

  onFormSubmit = eventChange => {
    eventChange.preventDefault();
    let login = this.state.login;

    if (login === true) {
      this.applicantLogin();
    }
    if (login === false) {
      this.companyLogin();
    }
  };

  applicantLogin = () => {
    let loginData = this.state;

    apiApplicant.login(loginData).then(data => {
      if (data.err) {
        return alert(data.err);
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
        return this.props.history.push("/applicant/profile");
      }
    });
  };

  companyLogin = () => {
    let loginData = this.state;

    apiCompany.login(loginData).then(data => {
      if (data.err) {
        return alert(data.err);
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
        return this.props.history.push("/company/profile");
      }
    });
  };

  render() {
    console.log(this.state.login);
    return (
      <div style={styles.PageStyle}>
        <div>
          <h3>Login</h3>
          <button onClick={() => this.changeLoginState()}>Switch Logins</button>

          <form style={styles.AppForm} onSubmit={this.onFormSubmit}>
            <input
              type="text"
              name={"email"}
              placeholder={"Email"}
              onChange={this.onInputChange}
            />
            <input
              type="text"
              name={"password"}
              placeholder={"Password"}
              onChange={this.onInputChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
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
  PageStyle: {
    display: "flex",
    justifyContent: "center"
  }
};

export default Login;
