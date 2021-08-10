require("dotenv").config();

const {
    scrapCategoriesToFile
} = require("./scrapper");
const {
    getPerformanceLogger
} = require("../utils/perfLogger");

(async function () {
    console.log("scrapping");

    const perfLogger = getPerformanceLogger("scrapping");

    await scrapCategoriesToFile({
        categories: [{
            name: "nature"
        }, {
            name: "city"
        }]
    });

    perfLogger();

    console.log(`Done`);
})()