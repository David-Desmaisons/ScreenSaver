import {
    options
} from "./config.mjs";

async function updateImage({
    element,
    query
}) {
    const info = await query.getRandomImageInfo();
    element.url = info.url;
}

function prepareDom(element) {
    element.classList.add("cover");
}

function runApp({
    element,
    command,
    query
}) {
    prepareDom(element);
    command.requestFullScreen();
    const update = () => updateImage({
        element,
        query
    });
    update();
    setInterval(update, options.refreshInMinutes * 60 * 1000)
}

export {
    runApp
}