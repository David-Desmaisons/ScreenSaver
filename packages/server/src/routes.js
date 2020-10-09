
const { bootstrapApplication } = require("./bootstrap");
 
const { getRandom } = require("./route/random");
const { getProviders } = require("./route/providers");
const { notFound } = require("./route/notFound");

const routesProvider = async () => {
  const { providers, finder } = await bootstrapApplication();
  return [
    { path: "/wallpapers/random", ...getRandom({ finder })},
    { path: "/providers", ...getProviders({ providers })},
    { path: "/{any*}", ...notFound },
  ];
};

module.exports = {
  routesProvider,
};
