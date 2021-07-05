import {
    getImageInfo
} from "./infra/get.js";
import {
    options
} from "./config.js";

async function updateImage(element) {
    const info = await getImageInfo();
    element.style["background-image"] = `url(${info.url})`;
}

function runApp(element) {
    element.classList.add("cover");
    const update = () => updateImage(element);
    update();
    setInterval(update, options.refreshInMinutes * 60 * 1000)
}

export {
    runApp
}