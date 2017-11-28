module.exports = {
  method: "GET",
  path: "/api/applicant",
  config: {
    handler: function(request, reply) {
      let applicantId = request.auth.credentials.id;

      this.models.Applicant.get(applicantId)
        .getJoin({ jobs: true, applications: true })
        .then(applicant => reply(applicant))
        .catch(err => reply(err));
    }
  }
};

// working
