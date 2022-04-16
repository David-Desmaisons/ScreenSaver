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
            <image-presenter class="main" ${viewModel.url ? `url=${viewModel.url}` : ''}>
                <div class="main-container">
                    <div class="icons">                    
                        <icon-button class="save"  ${viewModel.provider==='local' || !viewModel.provider ? 'style="display:none;"':''   }         icon="la-save"></icon-button>
                        <icon-button class="toggleFullScreen"   icon="${getFullscreenIcon(isFullScreen())}"></icon-button>
                        <icon-button class="stop"               icon="la-thumbtack" ${!viewModel.running ? "inverted" : ""}></icon-button>
                        <icon-button class="changeImage"        icon="la-redo"></icon-button>                       
                    </div>
                </div>
            </image-presenter>`;
        this._presenter = this._element.querySelector("image-presenter");
        this.setupInteractivity();
    }

    setupInteractivity() {
        ["save", "toggleFullScreen", "stop", "changeImage"]
        .forEach(command => {
            const button = this._element.querySelector(`div.icons icon-button.${command}`);
            this[`_${command}`] = button;
            button.addEventListener("click", () => this[command]());
        });

        listenToFullScreen(fullscreen => this._toggleFullScreen.icon = getFullscreenIcon(fullscreen))
    }

    toggleFullScreen() {
        toggleFullScreen();
    }

    changeImage() {
        return this._viewModel.changeImage();
    }

    async save() {
        await this._viewModel.save(this._viewModel.url);
    }

    async stop() {
        if (this._viewModel.running) {
            this._viewModel.stop();
            return;
        }
        await this._viewModel.changeImage();
    }

    update(viewModel, {
        propertyKey,
        value
    }) {
        this.viewModel = viewModel;
        switch (propertyKey) {
            case "url":
                this._presenter.url = value;
                break;

            case "running":
                this._stop.inverted = !value;
                break;

            case "provider":
                this._save.style.display = value ==="local" ? "none" : null;
                break;
        }
    }
}

const mainView = (element) => new MainView(element);

export {
    mainView
}