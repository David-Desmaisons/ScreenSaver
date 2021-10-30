import "../../components/imagePresenter.mjs";
import "../../components/iconButton.mjs";

import {
    toggleFullScreen,
    isFullScreen,
    listenToFullScreen
} from "../dom/fullScreen.mjs";

function getFullscreenIcon(fullscreen) {
    return fullscreen ? "la-compress" : "la-expand";
}

class MainView {
    constructor(element) {
        this._element = element;
    }

    create(viewModel) {
        this._viewModel = viewModel;
        this._element.innerHTML =
            `
            <link href="js/view/mainView.css" rel="stylesheet">
            <image-presenter class="main" url=${viewModel.url}>
                <div class="main-container">
                    <div class="icons">
                        <icon-button class="toggleFullScreen"   icon="${getFullscreenIcon(isFullScreen())}"></icon-button>
                        <icon-button class="stop"               icon="la-thumbtack"></icon-button>
                        <icon-button class="changeImage"        icon="la-redo"></icon-button>                       
                    </div>
                </div>
            </image-presenter>`;
        this._presenter = this._element.querySelector("image-presenter");
        this._toggleFullScreen = this._element.querySelector(".toggleFullScreen");

        this.setupInteractivity();
    }

    setupInteractivity() {
        ["toggleFullScreen", "stop", "changeImage"]
        .forEach(command => {
            const button = this._element.querySelector(`div.icons icon-button.${command}`);
            button.addEventListener("click", () => this[command]());
            this[`${command}Button`] = button;
        });

        listenToFullScreen(fullscreen => this._toggleFullScreen.icon = getFullscreenIcon(fullscreen))
    }

    toggleFullScreen() {
        toggleFullScreen();
    }

    async changeImage() {
        console.log("loading");
        await this._viewModel.changeImage();
        console.log("loaded");
    }

    stop() {
        this._viewModel.stop();
    }

    update(viewModel) {
        this.viewModel = viewModel;
        this._presenter.url = viewModel.url;
    }
}

const mainView = (element) => new MainView(element);

export {
    mainView
}