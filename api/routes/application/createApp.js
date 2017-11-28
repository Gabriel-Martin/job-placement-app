module.exports = {
  method: "POST",
  path: "/api/application",
  config: {
    handler: function(request, reply) {
      let app = this.models.Application(request.payload);

      let applicantId = request.auth.credentials.id;

      app.applicantId = applicantId;

      app
        .save()
        .then(result => reply(result))
        .catch(error => {
          console.log(error);
          reply(error);
        });
    }
  }
};
