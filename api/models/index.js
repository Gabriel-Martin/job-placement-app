const thinky = require("thinky");

const db = thinky({
  db: "JobPlacementApp"
});

let Applicant = require("./applicant")(db);
let Application = require("./application")(db);
let Job = require("./job")(db);
let Company = require("./company")(db);

Applicant.hasMany(Job, "jobs", "id", "applicantId");
Applicant.hasMany(Application, "applications", "id", "applicantId");

module.exports = {
  Applicant: Applicant,
  Application: Application,
  Company: Company,
  Job: Job
};
