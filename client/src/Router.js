import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import AuthenticatedRoute from "./containers/AuthenticatedRoute";

import Homepage from "./views/Homepage";
import Login from "./views/Login";
import Signup from "./views/Signup";
import JobDescriptionPage from "./views/JobDescriptionPage";
import ApplicantProfile from "./views/applicant/ApplicantProfile";
import ApplicantProfileSettings from "./views/applicant/ApplicantProfileSettings";
import ApplicationForm from "./views/applicant/ApplicationForm";
import CompanyDashboard from "./views/company/CompanyDashboard";
import CompanyProfile from "./views/company/CompanyProfile";
import CompanyProfileSettings from "./views/company/CompanyProfileSettings";
import CompanyApplication from "./views/company/CompanyApplication";
import CreateJob from "./views/company/CreateJob";
import EditJob from "./views/company/EditJob";

class Router extends Component {
  render() {
    return (
      <Container>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path={"/"} component={Homepage} />
              <Route exact path={"/login"} component={Login} />
              <Route exact path={"/signup"} component={Signup} />
              <Route
                exact
                path={"/jobs/:jobId"}
                component={JobDescriptionPage}
              />
              <AuthenticatedRoute
                exact
                path={"/applicant/profile"}
                component={ApplicantProfile}
              />
              <AuthenticatedRoute
                exact
                path={"/applicant/profile/settings/:applicantId"}
                component={ApplicantProfileSettings}
              />
              <AuthenticatedRoute
                exact
                path={"/applicant/applicationform/:jobId"}
                component={ApplicationForm}
              />
              <AuthenticatedRoute
                exact
                path={"/company/dashboard/:jobId"}
                component={CompanyDashboard}
              />
              <AuthenticatedRoute
                exact
                path={"/company/profile"}
                component={CompanyProfile}
              />
              <AuthenticatedRoute
                exact
                path={"/company/profile/settings/:companyId"}
                component={CompanyProfileSettings}
              />
              <AuthenticatedRoute
                exact
                path={"/company/application/:applicationId"}
                component={CompanyApplication}
              />
              <AuthenticatedRoute
                exact
                path={"/job/new"}
                component={CreateJob}
              />
              <AuthenticatedRoute
                exact
                path={"/job/edit/:jobId"}
                component={EditJob}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </Container>
    );
  }
}

const Container = styled.div.attrs({ className: "avenir" })`
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
`;

export default Router;
