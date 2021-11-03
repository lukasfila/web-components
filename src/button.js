let buttonTemplate = document.createElement('template');
buttonTemplate.innerHTML = `
    <style>
    button {
      font-family: "Tahoma",sans-serif;
      border: 1px solid black;
      font-size: 10pt;
    }
    </style>
    <button><slot></slot></button>
`;

class WebButton extends HTMLElement {
    form = "";
    type = "submit";

    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(buttonTemplate.content.cloneNode(true));
        this.button = this.shadowRoot.querySelector("button");
        this.button.setAttribute("type", this.type);
        this.button.setAttribute("form", this.form);

        this.bindEvents();
    }

    bindEvents() {
        this.button.addEventListener("click", () => this.onSubmit());
    }

    onSubmit() {
        this.dispatchEvent(new CustomEvent(this.type + "Button", {bubbles: true}))
    }

    static get observedAttributes() {
        return ["type", "form"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "type":
                this.type = newValue;
                break
            case "form":
                this.form = newValue;
                break;
            default:
                break;
        }
    }
}

window.customElements.define('web-button', WebButton);