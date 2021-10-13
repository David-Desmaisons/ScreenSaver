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

    create(viewModel) {
        this._viewModel = viewModel;
        this._element.innerHTML =
            `
            <link href="js/view/mainView.css" rel="stylesheet">
            <image-presenter class="main" url=${viewModel.url}>
                <div class="main-container">
                    <div class="icons">
                        <i class="toggleFullScreen las ${getFullscreenIcon(isFullScreen())}"></i>                     
                        <i class="stop las la-thumbtack"></i>
                        <i class="changeImage las la-redo"></i>
                    </div>
                </div>
            </image-presenter>`;
        this._presenter = this._element.querySelector("image-presenter");

        this.setupInteractivity();
    }

    setupInteractivity() {
        ["toggleFullScreen", "stop", "changeImage"]
        .forEach(command => {
            const button = this._element.querySelector(`div.icons i.${command}`);
            button.addEventListener("click", () => this[command]());
            this[`${command}Button`] = button;
        });

        listenToFullScreen(fullscreen => {
            const newClass = getFullscreenIcon(fullscreen);
            const oldClass = getFullscreenIcon(!fullscreen);
            switchClass(this.toggleFullScreenButton, newClass, oldClass);
        })
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