const data = require("../data/wallpaper.JSON");

const getWallpaper = ({
  chance
}) => {
  return chance.pickone(data);
}


module.exports = {
  getWallpaper
}