const data = require("../data/wallpaper");

const getWallpaper = ({
  chance
}) => {
  return chance.pickone(data);
}


module.exports = {
  getWallpaper
}