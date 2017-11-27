module.exports = {
  method: "POST",
  path: "/api/applicant",
  config: {
    handler: function(request, reply) {
      reply("test");
    }
  }
};
