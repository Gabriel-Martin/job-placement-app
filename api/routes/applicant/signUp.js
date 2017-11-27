module.exports = {
  method: "POST",
  path: "/api/applicant",
  config: {
    auth: {
      mode: "optional"
    },
    handler: function(request, reply) {
      let applicant = new this.models.Applicant(request.payload);

      applicant
        .save()
        .then(applicant => {
          delete applicant.password;
          reply(applicant);
        })

        .catch(err => reply(err));
    }
  }
};
