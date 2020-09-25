const Hapi = require("@hapi/hapi");
const { resilient } = require("./utils/resilient");
const { routes } = require("./routes");

const createServer = async (port) => {
  const server = Hapi.server({
    port,
    host: "localhost",
  });
  server.route(routes);
  await server.start();
  return server;
};

const init = async () => {
  const server = await resilient((port) => createServer(port + 3000), 10);
  if (server === null) {
    console.log("Unable to run server");
    return;
  }
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
