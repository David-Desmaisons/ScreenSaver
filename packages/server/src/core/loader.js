const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readdirAsync = promisify(fs.readdir);

function loadModule(directory) {
  const packagePath = path.join(directory, "package.json");
  const package = require(packagePath);
  const mainPath = path.join(directory, package.main);
  const { getWallPaper } = require(mainPath);
  return getWallPaper ? {getWallPaper, provider: package.name} : null;
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
  console.log(getters);
}

module.exports = {
  loadProviders,
};
