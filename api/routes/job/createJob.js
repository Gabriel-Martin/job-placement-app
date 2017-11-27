module.exports = {
  method: "POST",
  path: "/api/job",
  config: {
    handler: function(request, reply) {
      let newJob = new this.models.Job(request.payload);

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
