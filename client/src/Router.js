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
            <Route exact path={"/jobs/:jobId"} component={JobDescriptionPage} />
            <AuthenticatedRoute
              exact
              path={"/applicant/profile"}
              component={ApplicantProfile}
            />
            <AuthenticatedRoute
              exact
              path={"/applicant/profile/settings"}
              component={ApplicantProfileSettings}
            />
            <AuthenticatedRoute
              exact
              path={"/applicant/applicationform"}
              component={ApplicationForm}
            />
            <AuthenticatedRoute
              exact
              path={"/company/dashboard"}
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
            <AuthenticatedRoute exact path={"/job/new"} component={CreateJob} />
            <AuthenticatedRoute
              exact
              path={"/job/edit/:jobId"}
              component={EditJob}
            />{" "}
            */
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
