(function()  {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Colored Box Properties</legend>
				<table>
					<tr>
						<td>Color</td>
						<td><input id="styling_color" type="text" size="40" maxlength="40"></td>
					</tr>
					<tr>
					<td>Border Color</td>
					<td><input id="border_color" type="text" size="40" maxlength="3"></td>
				</tr>
				</table>
				<input type="submit" style="display:none;">
			</fieldset>
		</form>
	`;

	class ColoredBoxStylingPanel extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							color: this.color,
							bordercolor: this.bordercolor
						}
					}
			}));
		}

		set color(newColor) {
			this._shadowRoot.getElementById("styling_color").value = newColor;
		}

		get color() {
			return this._shadowRoot.getElementById("styling_color").value;
		}

		set bordercolor(newBordercolor) {
			this._shadowRoot.getElementById("boarder_color").value = newBordercolor;
		}

		get bordercolor() {
			return this._shadowRoot.getElementById("boarder_color").value;
		}
	}

customElements.define("com-novo-coloredbox-b-styling", ColoredBoxStylingPanel);
//})
})();
