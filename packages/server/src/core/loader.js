const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readdirAsync = promisify(fs.readdir);

function loadModule(directory) {
  const packagePath = path.join(directory, "package.json");
  const { main, name } = require(packagePath);
  const mainPath = path.join(directory, main);
  const { getWallpaper } = require(mainPath);
  return getWallpaper ? { getWallpaper, name } : null;
}

function safeLoadModule(rootPath, directory) {
  try {
    const directoryPath = path.join(rootPath, directory.name);
    return loadModule(directoryPath);
  } catch (exception) {
    console.log(exception);
  }
  return null;
}

async function loadProviders() {
  const rootPath = path.join(__dirname, "../../../");

  const files = await readdirAsync(rootPath, { withFileTypes: true });
  const directories = files.filter(
    (f) => f.isDirectory() && /-provider$/.test(f.name)
  );
  const getters = directories
    .map((directory) => safeLoadModule(rootPath, directory))
    .filter((getter) => !!getter);
  return getters;
}

module.exports = {
  loadProviders,
};
