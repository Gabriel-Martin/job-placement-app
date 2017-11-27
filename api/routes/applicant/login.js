module.exports = {
  method: "POST",
  path: "/api/applicant/login",
  config: {
    auth: {
      mode: "optional"
    },
    handler: function(request, reply) {
      let { email, password } = request.payload;

      this.models.Applicant.filter({ email: email })
        .then(applicant => {
          if (applicant.length === 0) {
            throw "email/password combo invalid";
          } else {
            let [applicant] = applicant;
            return applicant.comparePassword(password);
          }
        })
        .then(applicant => {
          if (!applicant) {
            throw "email/password combo invalid";
          } else {
            delete applicant.password;
            return applicant.generateJWT();
          }
        })
        .then(token => reply({ token }))
        .catch(err => reply(err));
    }
  }
};
