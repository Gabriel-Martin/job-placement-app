const { newApplication } = require("../email");

module.exports = {
  method: "POST",
  path: "/api/application",
  config: {
    handler: function(request, reply) {
      let app = this.models.Application(request.payload);
      let applicantId = request.auth.credentials.id;

      app.applicantId = applicantId;

      this.models.Applicant.get(applicantId)
        .then(applicant => applicant.removeRelation("jobs", { id: app.jobId }))
        .then(result => {
          return app
            .save()
            .then(result => {
              reply(result);
              this.models.Job.get(app.jobId)
                .getJoin({ company: true })
                .then(job => {
                  newApplication({
                    email: job.company.email,
                    name: `${app.firstName} ${app.lastName}`,
                    company: job.company.companyName
                  });
                });
            })
            .catch(error => {
              console.log(error);
              reply(error);
            });
        })
        .catch(error => {
          console.log(error);
          reply(error);
        });
    }
  }
};
