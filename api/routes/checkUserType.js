module.exports = {
  path: "/api/checkuser",
  method: "GET",
  config: {
    auth: {
      mode: "optional"
    },
    handler: function(request, reply) {
      let userType = request.auth.credentials.userType;
      let id = request.auth.credentials.id;

      if (userType === "company") {
        this.models.Company.get(id)
          .then(company => {
            if (!company.id) {
              return;
            }
          })
          .then(() => reply({ userType: "company" }))
          .catch(err => {
            console.log(err);
            reply(err);
          });
      }

      if (userType === "applicant") {
        this.models.Applicant.get(id)
          .then(applicant => {
            if (!applicant.id) {
              return;
            }
          })
          .then(() => reply({ userType: "applicant" }))
          .catch(err => {
            console.log(err);
            reply(err);
          });
      }
    }
  }
};
