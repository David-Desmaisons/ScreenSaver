const { Finder } = require("./core/Finder");
const { loadProviders } = require("./core/loader");
const Chance = require("chance");

const bootstrapApplication = async ({
  port = 3000,
  host = "localhost",
  chance : providedChance = null,
  logger : providedLogger = null
} = {}) => {
  const logger = providedLogger || console;
  const chance = providedChance || new Chance();
  const providers = await loadProviders();
  const finder = new Finder({providers, chance});
  logger.log({
    chance: chance.string(),
    providers: providers.map((g) => g.name),
  });
  return {
    chance,
    finder,
    providers,
    port,
    host,
    logger
  };
};

module.exports = {
  bootstrapApplication,
};
