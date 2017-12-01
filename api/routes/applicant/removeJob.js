module.exports = {
  method: "DELETE",
  path: "/api/applicant/{applicantId}/job",
  config: {
    handler: function(request, reply) {
      let applicantId = request.auth.credentials.id;
      let jobId = request.payload;

      this.models.Applicant.get(applicantId)
        .then(applicant => applicant.removeRelation("jobs", jobId))
        .then(result => reply(result))
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
