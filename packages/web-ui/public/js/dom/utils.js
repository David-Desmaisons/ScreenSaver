async function requestFullScreen() {
    try {
        return await requestFullScreenUnsafe();
    } catch {
        return false;
    }
}

async function requestFullScreenUnsafe() {
    const {
        document: {
            documentElement
        }
    } = window;
    if (documentElement.requestFullscreen) {
        await documentElement.requestFullscreen();
        return true;
    }
    if (documentElement.mozRequestFullScreen) {
        await documentElement.mozRequestFullScreen();
        return true;
    }
    if (!documentElement.webkitRequestFullScreen) {
        return false;
    }
    await documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    return true;
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