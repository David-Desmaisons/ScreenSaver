const Hapi = require("@hapi/hapi");
const { routes } = require("./routes");

const buildServer = (port = 3000) => {
  const server = Hapi.server({
    port,
    host: "localhost",
  });
  server.route(routes);
  return server;
};

const createServer = async (port) => {
  const { addSwagger } = require("./swagger");
  const server = buildServer(port);
  await addSwagger(server);
  await server.start();
  return server;
};

const initServer = async (port) => {
  const server = buildServer(port);
  await server.init();
  return server;
};

module.exports = {
  createServer,
  initServer,
};
