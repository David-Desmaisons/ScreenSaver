const template = document.createElement("template");
template.innerHTML = `
    <link href="components/icon-button.css" rel="stylesheet">
    <i class="las"></i>`;

class IconButton extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({
            mode: "open"
        });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this._root = this._shadowRoot.querySelector(".las");
        this._root.classList.add(this.icon);
    }

    static get observedAttributes() {
        return ["icon", "inverted"];
    }

    get icon() {
        return this.getAttribute("icon");
    }

    set icon(newValue) {
        this.setAttribute("icon", newValue);
    }

    set inverted(newValue) {
        if (newValue) {
            this.setAttribute("inverted", "");
            return;
        }
        this.removeAttribute("inverted");
    }

    get inverted() {
        return this.hasAttribute("inverted");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return
        }
        switch (name) {
            case "icon":
                this._root.classList.remove(oldValue);
                this._root.classList.add(newValue);
                break;

            case "inverted":
                this._root.classList.toggle("inverted", this.inverted);
                break;

            default:
                break;
        }
    }
}

customElements.define("icon-button", IconButton);