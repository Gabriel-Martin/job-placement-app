module.exports = {
  path: "/api/job/{jobId}",
  method: "DELETE",
  config: {
    handler: function(request, reply) {
      let jobId = request.params.jobId;

      this.models.Job
        .get(jobId)
        .then(doc => doc.delete())
        .then(result => reply(true))
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};