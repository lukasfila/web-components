let inputTemplate = document.createElement('template');
inputTemplate.innerHTML = `
    <style>
    label {
      font-family: "Tahoma",sans-serif;
      font-size: 10pt;
    }
    input {
      font-family: "Tahoma",sans-serif;
      border: 1px dashed black;
      font-size: 10pt;
    }
    </style>
    <label><slot></slot></label>
    <input />
`;

class WebInput extends HTMLElement {
    input;
    attr = new Map();

    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(inputTemplate.content.cloneNode(true));

        this.input = this.shadowRoot.querySelector("input");
        this.label = this.shadowRoot.querySelector("label");
        const id = "id-" + Math.random();

        this.input.setAttribute("id", id);
        this.label.setAttribute("for", id)
        this.update();
        this.bindEvents();
    }

    bindEvents() {
        const keyUpHandler = (event) => {
            if (event.key === "Enter") {
                this.dispatchEvent(new CustomEvent("submitButton", {bubbles: true}));
            } else {
                this.dispatchEvent(new CustomEvent("valueChanged", {bubbles: true, detail: this.input.value}));
            }
        }
        this.input.addEventListener("keyup", keyUpHandler);
    }

    update() {
        if (!this.input) {
            return;
        }
        for (let property in this.attr) {
            if (this.attr.hasOwnProperty(property)) {
                if (property === "value") {
                    this.input.value = this.attr[property]
                } else {
                    this.input.setAttribute(property, this.attr[property]);
                }
            }
        }
    }

    static get observedAttributes() {
        return ["value", "name", "id"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.attr[name] = newValue;
        this.update();
    }
}

window.customElements.define('web-input', WebInput);