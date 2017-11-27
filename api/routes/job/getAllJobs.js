module.exports = {
  path: "/api/job",
  method: "GET",
  config: {
    handler: function(request, reply) {
      this.models.Job
        .filter({})
        .then(results => reply(results))
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
