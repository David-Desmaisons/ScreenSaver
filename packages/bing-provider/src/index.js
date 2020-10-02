const got = require("got");

function buildUrl({
    number = 1,
    lang = "en-US"
} = {}) {
    return `http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=${number}&mkt=${lang}`;
}

function map({
    url,
    copyright: description
}) {
    return {
        url: `http://www.bing.com/${url}`,
        description,
        photographer: "",
        location: null
    };
}

async function getWallpaper({
    lang = "en-US"
} = {}) {
    const url = buildUrl({
        lang
    });
    const response = await got(url).json();
    const {
        images: [image, ]
    } = response;
    return map(image);
}

module.exports = {
    getWallpaper
}