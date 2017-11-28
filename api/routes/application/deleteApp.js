module.exports = {
  method: "DELETE",
  path: "/api/application/{appId}",
  config: {
    handler: function(request, reply) {
      let appId = request.params.appId;

      this.models.Application.get(appId)
        .then(doc => doc.delete())
        .then(result => reply(true))
        .catch(error => reply(error));
    }
  }
};
