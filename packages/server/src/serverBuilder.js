const Hapi = require("@hapi/hapi");
const { routesProvider } = require("./routes");

const buildServer = async (port = 3000) => {
  const server = Hapi.server({
    port,
    host: "localhost",
    routes: {
      cors: true,
    },
  });
  const routes = await routesProvider();
  server.route(routes);
  return server;
};

const createServer = async (port) => {
  const { addSwagger } = require("./swagger");
  const server = await buildServer(port);
  await addSwagger(server);
  await server.start();
  return server;
};

const initServer = async (port) => {
  const server = await buildServer(port);
  await server.init();
  return server;
};

module.exports = {
  createServer,
  initServer,
};
