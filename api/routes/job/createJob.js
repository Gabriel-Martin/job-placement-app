module.exports = {
  method: "POST",
  path: "/api/job",
  config: {
    handler: function(request, reply) {
      let newJob = new this.models.Job(request.payload);

      // let companyId = request.auth.credentials.id
      let companyId = "509ebc98-7204-4dc2-940b-baa050f0acf9";

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
