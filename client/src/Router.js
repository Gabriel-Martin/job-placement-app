import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import AuthenticatedRoute from "./containers/AuthenticatedRoute";

import Homepage from "./views/Homepage";
import Login from "./views/Login";
import Signup from "./views/Signup";
import JobDescriptionPage from "./views/JobDescriptionPage";
import ApplicantProfile from "./views/applicant/ApplicantProfile";
import ApplicantProfileSettings from "./views/applicant/ApplicantProfileSettings";
import ApplicationForm from "./views/applicant/ApplicationForm";
import CompanyDashboard from "./views/company/CompanyDashboard";
import CompanyJobDescriptionPage from "./views/company/CompanyJobDescriptionPage";
import CompanyProfile from "./views/company/CompanyProfile";
import CompanyProfileSettings from "./views/company/CompanyProfileSettings";
import CreateJob from "./views/company/CreateJob";
import EditJob from "./views/company/EditJob";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
            <Route exact path={"/"} component={Homepage} />
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/signup"} component={Signup} />

            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/signup"} component={Signup} />
            <Route
              exact
              path={"/placeholder1"}
              component={JobDescriptionPage}
            />
            <AuthenticatedRoute>
              <Route
                exact
                path={"/applicant/profile"}
                component={ApplicantProfile}
              />
              <Route
                exact
                path={"/applicant/profile/settings"}
                component={ApplicantProfileSettings}
              />
              <Route
                exact
                path={"/applicant/applicationform"}
                component={ApplicationForm}
              />
              <Route
                exact
                path={"/company/dashboard"}
                component={CompanyDashboard}
              />
              <Route
                exact
                path={"/company/placeholder2"}
                component={CompanyJobDescriptionPage}
              />
              <Route
                exact
                path={"/company/profile"}
                component={CompanyProfile}
              />
              <Route
                exact
                path={"/company/profile/settings"}
                component={CompanyProfileSettings}
              />
              <Route exact path={"/placeholder3"} component={CreateJob} />
              <Route exact path={"/placeholder4"} component={EditJob} /> */
            </AuthenticatedRoute>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
