module.exports = {
  path: "/api/job/{jobId}",
  method: "DELETE",
  config: {
    handler: function(request, reply) {
      let jobId = request.params.jobId;

      this.models.Job.get(jobId)
        .getJoin({ applications: true })
        .then(doc => doc.deleteAll())
        .then(result => reply(true))
        .catch(err => reply(err));
    }
  }
};
