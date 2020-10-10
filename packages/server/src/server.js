const { startServer } = require("./serverBuilder");
const { resilient } = require("./utils/resilient");

const init = async () => {
  const server = await resilient((tentative) => startServer(tentative + 3000), 10);
  if (server === null) {
    console.log("Unable to run server");
    return;
  }
  console.log("Server running on %s", server.info.uri);
  console.log("Documentation running on %s/documentation", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
