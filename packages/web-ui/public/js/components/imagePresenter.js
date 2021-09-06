import {
    updateBackgroundImage
} from "../dom/updateBackgroundImage.mjs"

const template = document.createElement('template');
template.innerHTML = `
  <style>
  .image-presenter {
    width:inherit;
    height:inherit;
    background-size: cover;
    background-position: center;
    -webkit-transition: background-image 0.2s ease-in-out;
    transition: background-image 0.2s ease-in-out;
  }
  </style>
 
  <div class="image-presenter">
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

    async attributeChangedCallback(name, _, newVal) {
        if (name !== "url") {
            return;
        }
        await updateBackgroundImage(this.root, newVal);
    }
}

customElements.define('image-presenter', ImagePresenter);