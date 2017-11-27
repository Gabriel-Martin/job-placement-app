module.exports = {
  method: "GET",
  path: "/api/company",
  config: {
    handler: function(request, reply) {
      this.models.Company.filter({})
        .then(companies => reply(companies))
        .catch(err => reply(err));
    }
  }
};
