import {
    options
} from "./config.mjs";

async function updateImage({
    element,
    command,
    query
}) {
    const info = await query.getRandomImageInfo();
    await command.updateBackgroundImage(element, info.url);
    element.classList.remove("loading");
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
        command,
        query
    });
    update();
    setInterval(update, options.refreshInMinutes * 60 * 1000)
}

export {
    runApp
}