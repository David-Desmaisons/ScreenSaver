const path = require("path");
const fs = require("fs");
const url = require("url");
const { promisify } = require("util");
const readdirAsync = promisify(fs.readdir);
const { getConfiguration } = require("./configuration");

function filter(file) {
  const extension = path.extname(file);
  return [".jpg", ".jfif", ".jpeg"].includes(extension);
}

async function getWallpaper({ chance, directory }) {
  const rootDirectory = directory || getConfiguration().rootDirectory;
  const files = await readdirAsync(rootDirectory);
  const file = chance.pickone(files.filter(filter));
  return {
    url: url.pathToFileURL(path.join(rootDirectory, file)).href,
    description: "",
    photographer: "",
    location: null,
  };
}

module.exports = {
  getWallpaper,
};
