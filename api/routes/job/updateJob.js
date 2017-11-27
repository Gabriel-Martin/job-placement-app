module.exports = {
  path: "/api/job/{jobId}",
  method: ["PATCH", "PUT"],
  config: {
    handler: function(request, reply) {
      let jobId = request.params.jobId;
      let updatedJob = request.payload;

      this.models.Job
        .get(jobId)
        .then(job =>
          job
            .merge(updatedJob)
            .save()
            .then(result => reply(result))
        )
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
