const data = require("../data/wallpaper");

const getWallpaper = ({
    forceRefresh= false,
    chance
}) => {
    return chance.pickone(data);
}


module.exports = {
  getWallpaper
}