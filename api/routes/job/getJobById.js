module.exports = {
  path: "/api/job/{jobId}",
  method: "GET",
  config: {
    auth: { mode: "optional" },
    handler: function(request, reply) {
      let jobId = request.params.jobId;

      this.models.Job
        .get(jobId)
        .getJoin({ applications: true, company: true })
        .then(result => reply(result))
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
