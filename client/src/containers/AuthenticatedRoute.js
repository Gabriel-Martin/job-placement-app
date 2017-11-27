import React, { Component } from "react";
import { Route } from "react-router-dom";
import jwt from "jsonwebtoken";

class AuthenticatedRoute extends Component {
  constructor() {
    super();

    this.state = {
      authenticated: false
    };
  }

  componentWillMount() {
    let token = localStorage.getItem("token");

    if (!token) {
      return this.setState(state => {
        return {
          authenticated: false
        };
      });
    }

    token = jwt.decode(token);

    if (!token || !token.id) {
      return this.setState(state => {
        return {
          authenticated: false
        };
      });
    }

    return this.setState(state => {
      return {
        authenticated: true
      };
    });
  }

  render() {
    let { authenticated } = this.state;
    return authenticated ? <Route {...this.props} /> : <div>Must Login</div>;
  }
}
export default AuthenticatedRoute;
