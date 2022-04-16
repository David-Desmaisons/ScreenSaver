const {
    saveImage
} = require("../utils/file");
const { getConfiguration } = require("./configuration")
const Boom = require("@hapi/boom");
const path = require("path");

async function saveImages({
    url,
    host
}) {
    const localPath = `${host}/provider/local/images/`;

    if (url.startsWith(localPath)) {
        throw Boom.badRequest("Can not save image from local provider");
    }

    const urlFrom = new URL(url);
    urlFrom.protocol= "https:";
    const fileName = (urlFrom.searchParams.get("id") || urlFrom.pathname.split('/').pop()).slice(0,40);
    const to = path.resolve(getConfiguration().rootDirectory, fileName);

    await saveImage({url: urlFrom.toString(), to});
}

module.exports = {
    saveImages
};