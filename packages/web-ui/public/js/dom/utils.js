function requestFullScreen() {
    const {
        document: {
            documentElement
        }
    } = window;
    if (documentElement.requestFullscreen) {
        documentElement.requestFullscreen();
        return;
    }
    if (documentElement.mozRequestFullScreen) {
        documentElement.mozRequestFullScreen();
        return;
    }
    if (documentElement.webkitRequestFullScreen) {
        documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
}

function loadImage(url) {
    return new Promise((resolve) => {
        const preloaderImg = document.createElement("img");
        preloaderImg.src = url;
        preloaderImg.addEventListener('load', resolve);
    })
}

async function updateBackgroundImage(element, url) {
    await loadImage(url);
    element.style["background-image"] = `url(${url})`;
}

export {
    requestFullScreen,
    updateBackgroundImage
}