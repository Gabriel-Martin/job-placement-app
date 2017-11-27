const thinky = require("thinky");

const db = thinky({
  db: "JobPlacementApp"
});

let Applicant = require("./applicant")(db);
let Application = require("./application")(db);
let Job = require("./job")(db);
let Company = require("./company")(db);

module.exports = {
  Applicant: Applicant,
  Application: Application,
  Company: Company,
  Job: Job
};
