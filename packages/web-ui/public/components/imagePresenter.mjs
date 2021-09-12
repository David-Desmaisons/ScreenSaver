import {
    updateBackgroundImage
} from "../js/dom/updateBackgroundImage.mjs"
import {
    createEvent
} from "./helper/events.mjs";

const template = document.createElement('template');
template.innerHTML = `
  <link href="components/image-presenter.css" rel="stylesheet">
  <div class="image-presenter loading loadable">
    <slot></slot>
  </div>
`;

class ImagePresenter extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.root = this._shadowRoot.querySelector(".image-presenter");
    }

    static get observedAttributes() {
        return ['url'];
    }

    get url() {
        return this.getAttribute('url');
    }

    set url(newValue) {
        this.setAttribute('url', newValue);
    }

    async attributeChangedCallback(name, _, newValue) {
        if (name !== "url") {
            return;
        }
        const loaded = await updateBackgroundImage(this.root, newValue);

        const eventName = loaded ? 'changedImage' : 'errorLoading';
        const event = createEvent(eventName, {
            url: newValue
        });    
        this.root.dispatchEvent(event);
        if (!loaded) {
            return;
        }
        this.root.classList.remove("loading");
    }
}

customElements.define('image-presenter', ImagePresenter);