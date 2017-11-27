module.exports = {
  path: "/api/job/{jobId}",
  method: "GET",
  config: {
    handler: function(request, reply) {
      let id = request.params.jobId;

      this.models.Job
        .filter({ id: id })
        .getJoin({ applications: true })
        .then(result => reply(result))
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
