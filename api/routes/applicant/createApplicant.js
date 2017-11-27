module.exports = {
  method: "POST",
  path: "/api/applicant",
  config: {
    handler: function(request, reply) {
      let applicant = new this.models.Applicant(request.payload);

      applicant
        .save()
        .then(applicant => reply(applicant))
        .catch(err => reply(err));
    }
  }
};

// working
