const models = require("./models");
const routes = require("./routes");

module.exports.register = (server, options, next) => {
  server.bind({
    models: models
  });

  server.route(routes);

  next();
};

module.exports.register.attributes = {
  name: "api",
  version: "0.0.7"
};
