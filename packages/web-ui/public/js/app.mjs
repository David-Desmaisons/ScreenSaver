import {
    options
} from "./config.mjs";

async function updateImageRandom({
    element,
    query,
    options = {}
}) {
    const info = await query.getRandomImageInfo(options);
    element.url = info.url;
}

let timerId;

function runApp({
    element,
    command,
    query
}) {
    command.requestFullScreen();
    const updateImage = (options) => updateImageRandom({
        element,
        query,
        options
    });
    const periodicChange = () => {
        timerId = setInterval(updateImage, options.refreshInMinutes * 60 * 1000);
    };
    const startCycle = (options = {}) => {
        updateImage(options);
        periodicChange();
    };

    startCycle();
    return {
        changeImage: (options) => {
            clearInterval(timerId);
            startCycle(options);
        }
    };
}

export {
    runApp
}