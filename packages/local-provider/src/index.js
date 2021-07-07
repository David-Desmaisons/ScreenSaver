const path = require("path");
const Inert = require('@hapi/inert');

require("dotenv").config({
  path: path.resolve(__dirname, "..", ".env")
});

const {
  addRoutes
} = require("./routes");
const {
  getWallpaper
} = require("./core/getWallpaper");


async function onServer(server) {
  await server.register(Inert);
}

const plugins = {
  addRoutes,
  onServer
};

module.exports = {
  getWallpaper,
  plugins,
};