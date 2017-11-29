import React, { Component } from "react";
import apiJobs from "../../api/jobCrud";

import NavBar from "../../components/NavBar";

class CreateJob extends Component {
  constructor() {
    super();

    this.state = {
      userType: ""
    };
  }

  componentDidMount() {
    this.setState(state => {
      return {
        ...state,
        userType: localStorage.getItem("userType")
      };
    });
  }

  formSubmit = submitE => {
    submitE.preventDefault();
    apiJobs.create(this.state).then(() => {
      this.props.history.push("/company/profile");
    });
  };

  inputChange = changeE => {
    changeE.persist();
    let name = changeE.target.name;
    let value = changeE.target.value;

    this.setState(state => {
      return {
        ...state,
        [name]: value
      };
    });
  };

  render() {
    let { userType } = this.state;
    return (
      <div>
        <NavBar userType={userType} />
        <h1>Create Job</h1>
        <form onSubmit={this.formSubmit}>
          <input
            type="text"
            name={"description"}
            placeholder={"description"}
            onChange={this.inputChange}
          />
          <input
            type="text"
            name={"experience"}
            placeholder={"experience"}
            onChange={this.inputChange}
          />
          <input
            type="text"
            name={"position"}
            placeholder={"position"}
            onChange={this.inputChange}
          />
          <input
            type="text"
            name={"payRate"}
            placeholder={"pay rate"}
            onChange={this.inputChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default CreateJob;
