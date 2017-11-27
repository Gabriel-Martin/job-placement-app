module.exports = {
  method: "POST",
  path: "/api/job",
  config: {
    handler: function(request, reply) {
      reply("test");
    }
  }
};
