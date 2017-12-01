module.exports = {
  path: "/api/job",
  method: "GET",
  config: {
    auth: {
      mode: "optional"
    },
    handler: function(request, reply) {
      this.models.Job.filter({})
        .getJoin()
        .then(results => reply(results))
        .catch(err => reply(err));
    }
  }
};
