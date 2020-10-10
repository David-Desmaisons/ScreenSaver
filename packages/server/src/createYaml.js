const { initServer } = require("./serverBuilder");
const fs = require("fs");
const path = require("path");
const Yaml = require("yamljs");

const createYamlFile = async () => {
  const server = await initServer();
  
  const response = await server.inject({
    method: "GET",
    url: "/swagger.json",
  });

  await server.stop();

  const swaggerJson =  JSON.parse(response.payload);
  const yaml = Yaml.dump(swaggerJson, 10, 2);
  const destiny = path.join(__dirname, "../spec", "openapi.yaml")
  const file = fs.openSync(destiny, "w+");
  fs.writeSync(file, yaml);
  fs.closeSync(file);
};

createYamlFile();
