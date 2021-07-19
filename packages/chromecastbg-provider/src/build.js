const fs = require("fs");
const path = require("path");
const {
    promisify
} = require("util");

const copyAsync = promisify(fs.copyFile);

async function transferFile() {
    const source = path.join(__dirname,"../../../loader/chromecastbg/output/result.json" );
    const destination = path.join(__dirname,"../data/wallpaper.json");
    await copyAsync(source, destination);
}

transferFile();