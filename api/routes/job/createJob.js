module.exports = {
  method: "POST",
  path: "/api/job",
  config: {
    handler: function(request, reply) {
      let newJob = new this.models.Job(request.payload);

      let companyId = request.auth.credentials.id;

      newJob.companyId = companyId;

      newJob
        .save()
        .then(result => reply(result))
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
