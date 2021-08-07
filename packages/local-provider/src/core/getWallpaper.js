const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const readdirAsync = promisify(fs.readdir);
const { getConfiguration } = require("./configuration");

function filter(file) {
  const extension = path.extname(file).toLowerCase();
  return [".jpg", ".jfif", ".jpeg", ".png"].includes(extension);
}

async function getWallpaper({ chance, directory, host }) {
  const rootDirectory = directory || getConfiguration().rootDirectory;
  const files = await readdirAsync(rootDirectory);
  const file = chance.pickone(files.filter(filter));
  return {
    url: `${host}/provider/local/images/${file}`,
    description: "",
    photographer: "",
    location: null,
  };
}

module.exports = {
  getWallpaper,
};
