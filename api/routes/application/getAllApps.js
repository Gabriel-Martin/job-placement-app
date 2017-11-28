module.exports = {
  method: "GET",
  path: "/api/application",
  config: {
    handler: function(request, reply) {
      this.models.Application.filter({})
        .getJoin({ jobs: true })
        .then(result => reply(result))
        .catch(error => reply(error));
    }
  }
};
