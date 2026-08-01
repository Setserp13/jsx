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

	const el = document.createElement(tag).with(props);

	for (const child of children) {

		if (child == null)
			continue;

		if (typeof child === "string")
			el.appendChild(document.createTextNode(child));
		else
			el.appendChild(child);
	}

	return el;
};
