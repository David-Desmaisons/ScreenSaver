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

export {
    requestFullScreen
}