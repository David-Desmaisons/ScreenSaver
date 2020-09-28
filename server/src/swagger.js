const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const Pack = require("../package.json");

const addSwagger = async (server) => {
  const swaggerOptions = {
    info: {
      title: Pack.name,
      version: Pack.version,
    },
  };
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);
  return server;
};

module.exports = {
  addSwagger,
};
