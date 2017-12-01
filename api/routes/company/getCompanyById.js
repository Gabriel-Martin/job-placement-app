module.exports = {
  method: "GET",
  path: "/api/company/{companyId}",
  config: {
    handler: function(request, reply) {
      let companyId = request.params.companyId;

      this.models.Company.get(companyId)
        .getJoin({
          jobs: {
            applications: true
          }
        })
        .then(company => reply(company))
        .catch(err => reply({ err }));
    }
  }
};
