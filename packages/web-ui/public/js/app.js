import {
    options
} from "./config.js";

async function updateImage({
    element,
    getRandomImageInfo
}) {
    const info = await getRandomImageInfo();
    element.style["background-image"] = `url(${info.url})`;
}

function runApp({
    element,
    query
}) {
    element.classList.add("cover");
    const {
        getRandomImageInfo
    } = query;
    const update = () => updateImage({
        element,
        getRandomImageInfo
    });
    update();
    setInterval(update, options.refreshInMinutes * 60 * 1000)
}

export {
    runApp
}