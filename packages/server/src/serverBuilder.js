const Hapi = require("@hapi/hapi");
const { routesProvider } = require("./routes");
const { bootstrapApplication } = require("./bootstrap");

const buildServer = async (bootstrap) => {
  const configuration = await bootstrap();
  const server = Hapi.server({
    port: configuration.port,
    host: configuration.host,
    routes: {
      cors: true,
    },
  });
  const registers = configuration.providers.map(({plugins}) => plugins.onServer(server));
  await Promise.all(registers);
  const routes = routesProvider(configuration);
  server.route(routes);
  return server;
};

const setUpCompleteServer =  async (bootstrap = bootstrapApplication) => {
  const { addSwagger } = require("./swagger");
  const server = await buildServer(bootstrap);
  await addSwagger(server);
  return server;
};

const startServer = async (port) => {
  const bootstrap = () => bootstrapApplication({port});
  const server = await setUpCompleteServer(bootstrap);
  await server.start();
  return server;
};

const initServer = async (bootstrap) => {
  const server = await setUpCompleteServer(bootstrap);
  await server.initialize();
  return server;
};

module.exports = {
  buildServer,
  startServer,
  initServer,
};
