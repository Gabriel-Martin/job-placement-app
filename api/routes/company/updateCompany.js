module.exports = {
  method: ["PUT", "PATCH"],
  path: "/api/company/{companyId}",
  config: {
    handler: function(request, reply) {
      let updateCompany = request.payload;
      let companyId = request.params.companyId;

      this.models.Company.get(companyId)
        .update(updateCompany)
        .then(response => reply(response))
        .catch(err => reply(err));
    }
  }
};
