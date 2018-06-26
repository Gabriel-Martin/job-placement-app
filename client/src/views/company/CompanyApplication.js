import React, { Component } from "react";
import styled from "styled-components";
import application from "../../api/applicationCrud";
import NavBar from "../../components/NavBar";

class CompanyApplication extends Component {
  constructor() {
    super();

    this.state = {
      userType: "",
      applications: {}
    };
  }

  componentDidMount() {
    let appId = this.props.match.params.applicationId;
    application.getById(appId).then(data => {
      this.setState(state => {
        return {
          ...state,
          userType: localStorage.getItem("userType"),
          applications: data
        };
      });
    });
  }

  render() {
    let { applications, userType } = this.state;
    return (
      <div>
        <NavBar userType={userType} />
        <Container>
          <h2>Application</h2>
          <Card>
            <App>
              <Label>Name:</Label>
              <p>
                {applications.firstName} {applications.lastName}
              </p>
            </App>
            <App>
              <Label>Address:</Label> <p>{applications.address}</p>
            </App>
            <App>
              <Label>City:</Label> <p>{applications.city}</p>
            </App>
            <App>
              <Label>State:</Label> <p>{applications.state}</p>
            </App>
            <App>
              <Label>Zip:</Label> <p>{applications.zip}</p>
            </App>
            <App>
              <Label>Email:</Label> <p>{applications.email}</p>
            </App>
            <App>
              <Label>Phone:</Label> <p>{applications.phone}</p>
            </App>
            <App>
              <Label>Education:</Label> <p>{applications.education}</p>
            </App>
          </Card>
        </Container>
      </div>
    );
  }
}

const Container = styled.div`
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.b`
  margin-right: 5px;
`;

const App = styled.div`
  display: flex;
  width: fit-content;
  padding: 5px;
  @media (max-width: 427px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  border-radius: 8px;
  background-color: #fff;
  width: 80%;
  height: auto;
  padding: 60px;
  @media (max-width: 320px) {
    padding: 40px;
  }
`;
export default CompanyApplication;
