const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "..", ".env")
});

const data = require("../data/result.json");

const getWallpaper = ({
  chance
}) => {
  const {
    url,
    description
  } = chance.pickone(data);
  return {
    url: `${process.env.baseUrl}${url}`,
    description
  }
}

module.exports = {
  getWallpaper
}