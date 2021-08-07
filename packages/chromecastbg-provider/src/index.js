const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "..", ".env")
});

const data = require("../data/wallpaper.json");
const {
  addRoutes
} = require("./route")

const getWallpaper = ({
  chance
}) => chance.pickone(data);

const plugins = {
  addRoutes
};

module.exports = {
  getWallpaper,
  plugins
}