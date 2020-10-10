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

const setUpCompleteServer =  async (port) => {
  const { addSwagger } = require("./swagger");
  const server = await buildServer(port);
  await addSwagger(server);
  return server;
};

const startServer = async (port) => {
  const server = await setUpCompleteServer(port);
  await server.start();
  return server;
};

const initServer = async () => {
  const server = await setUpCompleteServer();
  await server.initialize();
  return server;
};

module.exports = {
  buildServer,
  startServer,
  initServer,
};
