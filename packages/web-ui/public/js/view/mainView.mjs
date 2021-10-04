import "../../components/imagePresenter.mjs";

class MainView {
    constructor(element) {
        this._element = element;
    }

    create(state) {
        const presenter = document.createElement("image-presenter");
        presenter.setAttribute("class", "main");
        presenter.url = state.url;
        this._presenter = presenter;
        this._element.appendChild(presenter);
    }

    update(state) {
        this._presenter.url = state.url;
    }
}

const mainView = (element) => new MainView(element);

export {
    mainView
}