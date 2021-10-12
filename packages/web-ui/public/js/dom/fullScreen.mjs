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

async function exitFullScreen() {
    const {
        document
    } = window;
    const exit = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen
    return exit.call(document);
}

function isFullScreen() {
    return window.document.fullscreenElement !== null;
}

function toggleFullScreen() {
    return isFullScreen() ? exitFullScreen() : requestFullScreen();
}

function listenToFullScreen(callback) {
    document.onfullscreenchange = () => {
        callback(isFullScreen());
    };
}


export {
    toggleFullScreen,
    requestFullScreen,
    exitFullScreen,
    listenToFullScreen,
    isFullScreen
}