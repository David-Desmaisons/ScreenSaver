
const { getRandom } = require("./route/random");
const { getProviders } = require("./route/providers");
const { getNotFound } = require("./route/notFound");

const routesProvider = ({ providers, finder, logger }) => {
  return [
    { path: "/wallpapers/random", ...getRandom({ finder })},
    { path: "/providers", ...getProviders({ providers })},
    { path: "/{any*}", ...getNotFound({ logger}) },
  ];
};

module.exports = {
  routesProvider,
};
