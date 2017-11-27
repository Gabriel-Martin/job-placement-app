const thinky = require("thinky");

const db = thinky({
  db: "JobPlacementApp"
});

let Applicant = require("./applicant")(db);
let Application = require("./application")(db);
let Job = require("./job")(db);
let Company = require("./company")(db);

// relation for "interested in" jobs on applicant side
// displays all jobs related to applicant on applicant object
Applicant.hasMany(Job, "jobs", "id", "applicantId");
// relation for all applications of applicant
// displays all applications related to applicant on applicant object
Applicant.hasMany(Application, "applications", "id", "applicantId");
// relation for all company jobs
// displays all jobs related to company on company object
Company.hasMany(Job, "jobs", "id", "companyId");
// relation for all job applications
// displays all applications related to job on job object
Job.hasMany(Application, "applications", "id", "jobId");
// relation for application job
// displays job related to application on application object
Application.belongsTo(Job, "job", "jobId", "id");

module.exports = {
  Applicant: Applicant,
  Application: Application,
  Company: Company,
  Job: Job
};
