const data = require("../data/wallpaper.json");

const getWallpaper = ({ chance}) => chance.pickone(data);

module.exports = {
  getWallpaper
}