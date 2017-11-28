import React, { Component } from "react";
import api from "../../api/jobCrud";

class CreateJob extends Component {
  constructor() {
    super();

    this.state = {
      job: {}
    };
  }

  formSubmit = submitE => {
    let { job } = this.state;
    submitE.preventDefault();
    api.create(job).then(job => {
      this.props.history.push("/company/profile");
    });
  };

  inputChange = changeE => {
    changeE.persist();
    let name = changeE.target.name;
    let value = changeE.target.value;

    this.setState(state => {
      return {
        job: {
          ...state.job,
          [name]: value
        }
      };
    });
  };

  render() {
    return (
      <div>
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
