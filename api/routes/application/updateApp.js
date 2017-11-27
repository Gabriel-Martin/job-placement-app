module.exports = {
  method: ["PUT", "PATCH"],
  path: "/api/application/{appId}",
  config: {
    // auth: {
    //   mode: "optional"
    // },
    handler: function(request, reply) {
      let appId = request.params.appId;
      let updatedApp = request.payload;

      this.models.Application.get(appId).then(doc =>
        doc
          .merge(updatedApp)
          .save()
          .then(result => reply(result))
          .catch(error => reply(error))
      );
    }
  }
};
