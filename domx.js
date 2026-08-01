Element.prototype.with = function (props = {}) {

	for (const [key, value] of Object.entries(props)) {

		if (key.startsWith("on") && typeof value === "function") {
			this.addEventListener(key.slice(2), value);
		}
		else if (key === "class") {
			this.className = value;
		}
		else if (key === "style" && typeof value === "object") {
			Object.assign(this.style, value);
		}
		else {
			this[key] = value;
		}
	}
	
	return this;
};

function element(tag, props = {}, ...children) {

	const el = document.createElement(tag);

	for (const [key, value] of Object.entries(props)) {

		if (key.startsWith("on")) {
			el.addEventListener(
				key.substring(2),
				value
			);
		}
		else if (key in el) {
			el[key] = value;
		}
		else {
			el.setAttribute(key, value);
		}
	}

	for (const child of children) {

		if (child == null)
			continue;

		if (child instanceof Node)
			el.appendChild(child);

		else
			el.appendChild(
				document.createTextNode(String(child))
			);
	}

	return el;
}
