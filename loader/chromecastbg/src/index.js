require('dotenv').config()

const { importer } = require("./importChromeCastBgFiles");

(async () => {
  await importer();
})();
