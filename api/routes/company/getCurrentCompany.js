module.exports = {
  method: "GET",
  path: "/api/company/current",
  config: {
    handler: function(request, reply) {
      let companyId = request.auth.credentials.id;

      this.models.Company.get(companyId)
        .getJoin({ jobs: true, applications: true })
        .then(company => {
          delete company.password;
          reply(company);
        })
        .catch(err => reply(err));
    }
  }
};
