const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "..", ".env")
});

const {
  startServer
} = require("./serverBuilder");
const {
  resilient
} = require("./utils/resilient");

const init = async () => {
  const server = await resilient((tentative) => startServer(tentative + 3050), 10);
  if (server === null) {
    console.log("Unable to run server");
    return;
  }
  server.events.on({
    name: 'request',
    channels: 'error'
  }, (request, event) => {
    console.log(`Request ${request.method} ${request.path} failed: ${event.error? event.error.message : ""} `,event.error);
  });
  console.log("Server running on %s", server.info.uri);
  console.log("Documentation running on %s/documentation", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();