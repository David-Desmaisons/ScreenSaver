import "../../components/imagePresenter.mjs";
import {
    toggleFullScreen,
    isFullScreen,
    listenToFullScreen
} from "../dom/fullScreen.mjs";
import {
    switchClass
} from "../dom/classHelper.mjs";

function getFullscreenIcon(fullscreen) {
    return fullscreen ? "la-compress" : "la-expand";
}

class MainView {
    constructor(element) {
        this._element = element;
    }

    create(state) {
        this._state = state;
        this._element.innerHTML =
            `
            <link href="js/view/mainView.css" rel="stylesheet">
            <image-presenter class="main" url=${state.url}>
                <div class="main-container">
                    <div class="icons">
                        <i class="expand las ${getFullscreenIcon(isFullScreen())}"></i>
                        <i class="redo las la-redo"></i>
                        <i class="pin las la-thumbtack"></i>
                    </div>
                </div>
            </image-presenter>`;
        this._presenter = this._element.querySelector("image-presenter");

        this.setupInteractivity();
    }

    setupInteractivity() {
        const expandButton = this._findButton("expand");
        expandButton.addEventListener("click", toggleFullScreen);
    
        this._findButton("redo").addEventListener("click", () => this.changeImage());
        this._findButton("pin").addEventListener("click", () => this._state.stop());

        listenToFullScreen(fullscreen => {
            const newClass = getFullscreenIcon(fullscreen);
            const oldClass = getFullscreenIcon(!fullscreen);
            switchClass(expandButton, newClass, oldClass);
        })
    }

    _findButton(name) {
        return this._element.querySelector(`div.icons i.${name}`);
    }

    async changeImage() {
        console.log("loading");
        await this._state.changeImage();
        console.log("loaded");
    }

    update(state) {
        this._presenter.url = state.url;
    }
}

const mainView = (element) => new MainView(element);

export {
    mainView
}