module.exports = {
  method: "POST",
  path: "/api/application",
  config: {
    handler: function(request, reply) {
      let app = this.models.Application(request.payload);

      let userId = request.auth.credentials.id;

      app.applicantId = applicantId;

      app
        .save()
        .then(result => reply(result))
        .catch(error => reply(error));
    }
  }
};
