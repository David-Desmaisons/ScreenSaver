import {
    config
} from "../config/index.mjs"

function get(path) {
    return fetch(`${config.baseUrl}/${path}`);
}

function getRandomWallpaperUrl({
    forceRefresh = false,
    lang = "en-US",
    provider = null
} = {}) {
    const partial = `wallpapers/random?forceRefresh=${forceRefresh}&lang=${lang}`
    return provider ? `${partial}&provider=${provider}` : partial;
}

async function getRandomImageInfo(option) {
    const response = await get(getRandomWallpaperUrl(option));
    return response.json();
}

export {
    getRandomImageInfo
}