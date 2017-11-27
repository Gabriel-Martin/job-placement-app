const Hapi = require("hapi");
const api = require("./api");

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
  .register([{ register: api }])
  .then(() => {
    server
      .start()
      .then(() => console.log(`Server started at ${server.info.uri}`))
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
