module.exports = {
  method: "POST",
  path: "/api/application",
  config: {
    // auth: {
    //   mode: "optional"
    // },
    handler: function(request, reply) {
      let app = this.models.Application(request.payload);

      // let userId = request.auth.credentials.id;
      let applicantId = "767a7af1-2ef7-4468-9a6c-a80b88263fcc";

      app.applicantId = applicantId;

      app
        .save()
        .then(result => reply(result))
        .catch(error => reply(error));
    }
  }
};
