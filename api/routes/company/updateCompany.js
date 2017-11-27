module.exports = {
  method: ["PUT", "PATCH"],
  path: "/api/company/{companyId}",
  config: {
    handler: function(request, reply) {
      let updateCompany = request.payload;
      let companyId = request.params.companyId;

      this.models.Company.get(companyId).then(doc =>
        doc
          .merge(updateCompany)
          .save()
          .then(result => reply(result))
          .catch(err => {
            console.log(err);
            reply(err);
          })
      );
    }
  }
};
