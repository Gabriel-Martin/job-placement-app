module.exports = {
  method: "POST",
  path: "/api/applicant/{applicantId}/job",
  config: {
    handler: function(request, reply) {
      let applicantId = request.params.applicantId;
      let job = request.payload;

      this.models.Applicant
        .get(applicantId)
        .then(applicant => applicant.addRelation("jobs", job))
        .then(result => reply(result))
        .catch(err => reply(err));
    }
  }
};
