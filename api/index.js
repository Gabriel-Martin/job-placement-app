const Hapi = require("hapi");
const api = require("./api");

const hapiAuthJWT = require("hapi-auth-jwt2");

const server = new Hapi.Server();

server.connection({
  host: "localhost",
  port: 4040,
  routes: {
    cors: true
  },
  router: {
    stripTrailingSlash: true
  }
});

server
  .register([hapiAuthJWT, { register: api }])
  .then(() => {
    server
      .start()
      .then(() => console.log(`Server started at ${server.info.uri}`))
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
