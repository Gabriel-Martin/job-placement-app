module.exports = {
  method: "GET",
  path: "/api/application/{appId}",
  config: {
    // auth: {
    //   mode: "optional"
    // },
    handler: function(request, reply) {
      let appId = request.params.appId;

      this.models.Application.get(appId)
        .getJoin({ jobs: true })
        .then(result => reply(result))
        .catch(error => reply(error));
    }
  }
};
