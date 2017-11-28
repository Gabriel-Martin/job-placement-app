module.exports = {
  method: "GET",
  path: "/api/applicant",
  config: {
    handler: function(request, reply) {
      let applicantId = request.auth.credentials.id;

      this.models.Applicant
        .get(applicantId)
        .getJoin({
          jobs: true,
          applications: {
            job: true
          }
        })
        .then(applicant => {
          delete applicant.password;
          reply(applicant);
        })
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
