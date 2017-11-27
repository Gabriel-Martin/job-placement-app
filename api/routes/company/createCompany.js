module.exports = {
  method: "POST",
  path: "/api/company",
  config: {
    auth: { mode: "optional" },
    handler: function(request, reply) {
      let company = new this.models.Company(request.payload);

      company
        .save()
        .then(company => {
          delete company.password;

          reply(company);
        })
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
