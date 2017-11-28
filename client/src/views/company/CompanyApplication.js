import React, { Component } from "react";
import application from "../../api/applicationCrud";

class CompanyApplication extends Component {
  constructor() {
    super();

    this.state = {
      applications: {}
    };
  }

  componentDidMount() {
    let appId = this.props.match.params.applicationId;
    application.getById(appId).then(data => {
      this.setState(state => {
        return {
          applications: data
        };
      });
    });
  }

  render() {
    console.log(this.state.applications);
    let { applications } = this.state;
    return (
      <div>
        <h1>Application</h1>
        <div>
          {applications.firstName} {applications.lastName}
        </div>
      </div>
    );
  }
}

export default CompanyApplication;
// this should just be displaying one application not all of them
