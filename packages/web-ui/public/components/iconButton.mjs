const template = document.createElement('template');
template.innerHTML = `
    <link href="components/icon-button.css" rel="stylesheet">
    <i class="las"></i>`;

class IconButton extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this._root = this._shadowRoot.querySelector(".las");
        this._root.classList.add(this.icon);
    }

    static get observedAttributes() {
        return ['icon'];
    }

    get icon() {
        return this.getAttribute('icon');
    }

    set icon(newValue) {
        this.setAttribute('icon', newValue);
    }

    async attributeChangedCallback(name, odValue, newValue) {
        if (name !== "icon") {
            return;
        }
        this._root.classList.remove(odValue);
        this._root.classList.add(newValue);
    }
}

customElements.define('icon-button', IconButton);