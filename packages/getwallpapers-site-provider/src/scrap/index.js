require("dotenv").config();

const {
    scrapCategoryToFile
} = require("./scrapper");
const {
    getPerformanceLogger
} = require("../utils/perfLogger");

(async function () {
    console.log("scrapping");

    const perfLogger = getPerformanceLogger("scrapping");

    await scrapCategoryToFile({
        category: {
            name: "nature"
        }
    });

    perfLogger();

    console.log(`Done`);
})()