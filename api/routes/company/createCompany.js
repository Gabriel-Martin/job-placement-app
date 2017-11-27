module.exports = {
  method: "POST",
  path: "/api/company",
  config: {
    handler: function(request, reply) {
      reply("test");
    }
  }
};
