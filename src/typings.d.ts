declare namespace JSX {
	interface IntrinsicElements {
		'web-form': WebForm,
		'web-input': WebInput,

		/**
		 * `<web-button>` is an accessible and customizable button
		 *
		 * ```html
		 * <web-button>label</web-button>
		 * ```
		 *
		 * ### Styling
		 *
		 * The following shadow DOM parts are available for styling:
		 *
		 * Part name | Description
		 * ----------|-------------
		 * `label`   | The label (text) inside the button.
		 *
		 * The following attributes are available:
		 *
		 * Attribute    | Description
		 * -------------|-------------
		 * `type`       | Set type of button
		 *
		 * ```
		 */
		'web-button': WebButton
	}
}

declare class WebForm {
	action: string;
}

declare class WebInput {
	name: string;
}

declare class WebButton {
	children?: string | HTMLCollection;
	type: "submit" | "reset" | "button";
}