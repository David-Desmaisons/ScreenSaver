const {
    importer
} = require("./loader/importChromeCastBgFiles");
const {
    updateResult
} = require("./model/updateResult");
const path = require("path");

const addRoutes = () => [{
    path: "update-configuration",
    method: "POST",
    options: {
        tags: ["api"],
        response: {
            schema: updateResult,
        },
        async handler() {
            const { outputFile } = process.env;
            const destinationPath = path.resolve(`../chromecastbg-provider/data/${outputFile}.json`);
            await importer(destinationPath);
            return {
                ok: true
            };
        },
    },
}];

module.exports = {
    addRoutes
}