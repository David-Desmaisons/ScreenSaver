const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const { addRoutes } = require("./routes");
const { getWallpaper } = require("./core/getWallpaper");

const plugins = {
  addRoutes,
};

module.exports = {
  getWallpaper,
  plugins,
};
