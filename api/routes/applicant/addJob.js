module.exports = {
  method: "POST",
  path: "/api/applicant/job",
  config: {
    handler: function(request, reply) {
      let applicantId = request.auth.credentials.id;
      let job = request.payload;

      this.models.Applicant.get(applicantId)
        .then(applicant => applicant.addRelation("jobs", job))
        .then(result => reply(result))
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
