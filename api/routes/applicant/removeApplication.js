module.exports = {
  method: "DELETE",
  path: "/api/applicant/{applicantId}/application",
  config: {
    handler: function(request, reply) {
      let applicantId = request.params.applicantId;
      let application = request.payload;

      this.models.Applicant.get(applicantId)
        .then(applicant =>
          applicant.removeRelation("applications", application)
        )
        .then(result => reply(result))
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
