const fs = require("fs");
const path = require("path");
const {
    promisify
} = require("util");

const copyAsync = promisify(fs.copyFile);

async function transferFile() {
    const source = path.join(__dirname,"../../../loader/chromecastbg/output/result.JSON" );
    const destination = path.join(__dirname,"../data/wallpaper.JSON");
    await copyAsync(source, destination);
}

transferFile();