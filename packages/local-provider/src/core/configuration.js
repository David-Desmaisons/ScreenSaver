const fs = require("fs");

const configuration = {
  rootDirectory: process.env.IMAGE_DIRECTORY,
};

console.log({configuration});

function getConfiguration() {
  return configuration;
}

async function setConfiguration(newConfiguration) {
  await fs.promises.access(newConfiguration.rootDirectory);

  Object.entries(newConfiguration).forEach(
    ([key, value]) => (configuration[key] = value)
  );
}

module.exports = {
  getConfiguration,
  setConfiguration,
};
