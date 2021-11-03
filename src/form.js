let formTemplate = document.createElement('template');
formTemplate.innerHTML = `
<style>
web-input {
    color: blue;
}
label {
    color: black;
}
button {
    background: #efefef;
    border: 1px solid gray;
}
</style>
<form action="?submit" method="get">
    Custom components: <br/>
    <web-input name="input_name">Label</web-input>
    <web-button type="submit">Submit</web-button>
    <web-button type="reset">Clear</web-button>
    <br />
    Default (just for style comaprison): <br/>
    <label>Label:</label>
    <input/>
    <button type="button">Submit</button>
    <button type="reset">Clear</button>
</form>`;

class WebForm extends HTMLElement {
    data = {
        value: ""
    };

    connectedCallback() {
       this.render();
       this.bindEvents();
    }

    render() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(formTemplate.content.cloneNode(true));
    }

    submit() {
        console.log(this.data.value);
    }

    bindEvents() {
        this.shadowRoot.addEventListener("valueChanged", (event) => {
            this.data.value = event.detail;
        })
        this.shadowRoot.addEventListener("submitButton", () => {
            this.submit();
        });
        this.shadowRoot.addEventListener("resetButton", () => {
            this.shadowRoot.querySelector("web-input").setAttribute("value", "");
        });
    }
}

window.customElements.define('web-form', WebForm);