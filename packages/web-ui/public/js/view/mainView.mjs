import "../../components/imagePresenter.mjs";
import {
    toggleFullScreen,
} from "../dom/fullScreen.mjs"

class MainView {
    constructor(element) {
        this._element = element;
    }

    create(state) {
        this._element.innerHTML =
            `
            <link href="js/view/mainView.css" rel="stylesheet">
            <image-presenter class="main" url=${state.url}>
                <div class="main-container">
                    <div class="icons">
                        <i class="las la-battery-three-quarters"></i>
                    </div>
                </div>
            </image-presenter>`;
        this._presenter = this._element.querySelector("image-presenter");
        this._button = this._element.querySelector("div.main-container");
        this._button.addEventListener("click", toggleFullScreen);
    }

    update(state) {
        this._presenter.url = state.url;
    }
}

const mainView = (element) => new MainView(element);

export {
    mainView
}