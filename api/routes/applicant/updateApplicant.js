module.exports = {
  method: ["PUT", "PATCH"],
  path: "/api/applicant/{applicantId}",
  config: {
    handler: function(request, reply) {
      let applicantId = request.params.applicantId;

      this.models.Applicant
        .get(applicantId)
        .then(applicant =>
          applicant
            .merge(request.payload)
            .save()
            .then(result => reply(result))
        )
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};

// working
