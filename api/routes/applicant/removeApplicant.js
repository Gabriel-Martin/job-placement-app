module.exports = {
  method: "DELETE",
  path: "/api/applicant/{applicantId}",
  config: {
    handler: function(request, reply) {
      let applicantId = request.params.applicantId;

      this.models.Applicant
        .get(applicantId)
        .then(doc => doc.delete())
        .then(result => reply(true))
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};

// working
