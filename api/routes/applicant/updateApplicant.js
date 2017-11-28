module.exports = {
  method: ["PUT", "PATCH"],
  path: "/api/applicant/{applicantId}",
  config: {
    handler: function(request, reply) {
      let applicantId = request.params.applicantId;
      let updatedApplicant = request.payload;

      console.log(request.payload);

      this.models.Applicant
        .get(applicantId)
        .update(updatedApplicant)
        .then(applicant => reply(applicant))
        .catch(err => reply(err));
    }
  }
};

// working
