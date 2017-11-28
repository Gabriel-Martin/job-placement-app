module.exports = {
  method: "GET",
  path: "/api/application/{appId}",
  config: {
    handler: function(request, reply) {
      let appId = request.params.appId;

      this.models.Application.get(appId)
        .getJoin({ job: true })
        .then(result => reply(result))
        .catch(error => reply(error));
    }
  }
};
