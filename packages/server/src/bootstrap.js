const { Finder } = require("./core/Finder");
const { loadProviders } = require("./core/loader");
const Chance = require("chance");

const bootstrapApplication = async () => {
  const providers = await loadProviders();
  const chance = new Chance();
  const finder = new Finder(providers, chance);
  return {
    chance,
    finder,
    providers,
  };
};

module.exports = {
  bootstrapApplication,
};
