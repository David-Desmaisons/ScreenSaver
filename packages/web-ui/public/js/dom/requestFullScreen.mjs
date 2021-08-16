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

export {
    requestFullScreen,
}