module.exports = {
  method: "GET",
  path: "/api/applicant/{applicantId}",
  config: {
    handler: function(request, reply) {
      let applicantId = request.params.applicantId;

      this.models.Applicant
        .get(applicantId)
        .getJoin({ jobs: true })
        .then(applicant => reply(applicant))
        .catch(err => reply(err));
    }
  }
};

// working
