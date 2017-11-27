module.exports = {
  method: "POST",
  path: "/api/application",
  config: {
    // auth: {
    //   mode: "optional"
    // },
    handler: function(request, reply) {
      let app = this.models.Application(request.payload);

      app
        .save()
        .then(result => reply(result))
        .catch(error => reply(error));
    }
  }
};
