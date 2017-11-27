module.exports = {
  method: "GET",
  path: "/api/application",
  config: {
    // auth: {
    //   mode: "optional"
    // },
    handler: function(request, reply) {
      this.models.Application.filter({})
        .getJoin({ jobs: true })
        .then(result => reply(result))
        .catch(error => reply(error));
    }
  }
};
