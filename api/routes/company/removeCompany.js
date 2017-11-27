module.exports = {
  method: "DELETE",
  path: "/api/company/{companyId}",
  config: {
    handler: function(request, reply) {
      let companyId = request.params.companyId;

      this.models.Company.get(companyId)
        .then(doc => doc.delete())
        .then(result => reply(true))
        .catch(err => reply(err));
    }
  }
};
