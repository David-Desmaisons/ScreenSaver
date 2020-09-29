const fs = require("fs");
const {
    promisify
} = require("util");

const copyAsync = promisify(fs.copyFile);

async function transferFile() {
    await copyAsync("../../loader/chromecastbg/output/result.JSON", "./data/wallpaper.JSON");
}

transferFile();