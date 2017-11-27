module.exports = {
  method: "POST",
  path: "/api/application",
  config: {
    handler: function(request, reply) {
      reply("test");
    }
  }
};
