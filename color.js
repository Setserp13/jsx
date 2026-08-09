class Color {

    constructor(r = 0, g = 0, b = 0, a = 1) {

        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;

        this.clamp();
    }

    static fromHex(hex) {

        hex = hex.replace("#", "");

        if (hex.length === 3) {

            hex = hex.split("").map(c => c + c).join("");
        }

        return new Color(parseInt(hex.substring(0, 2), 16), parseInt(hex.substring(2, 4), 16), parseInt(hex.substring(4, 6), 16));
    }

    clone() { return new Color(this.r, this.g, this.b, this.a); }

    clamp() {

        this.r = Math.max(0, Math.min(255, this.r));
        this.g = Math.max(0, Math.min(255, this.g));
        this.b = Math.max(0, Math.min(255, this.b));

        this.a = Math.max(0, Math.min(1, this.a));

        return this;
    }

    add(color) { return new Color(this.r + color.r, this.g + color.g, this.b + color.b, this.a + color.a); }

    subtract(color) { return new Color(this.r - color.r, this.g - color.g, this.b - color.b, this.a - color.a); }

    multiply(value) {

        if (value instanceof Color) {

            return new Color(this.r * value.r / 255, this.g * value.g / 255, this.b * value.b / 255, this.a * value.a);
        }

        return new Color(this.r * value, this.g * value, this.b * value, this.a);
    }

    divide(value) { return new Color(this.r / value, this.g / value, this.b / value, this.a); }

    lerp(color, amount) { return this.add(color.subtract(this).multiply(amount)); }

    toHex() {

        const hex = value => Math.round(value).toString(16).padStart(2, "0");

        return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
    }

    toRGB() { return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`; }

    toRGBA() { return `rgba(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)}, ${this.a})`; }

	get luminance() { return (0.299 * this.r) + (0.587 * this.g) + (0.114 * this.b); }
}

function gradient(position, stops) {

    position = Math.max(0, Math.min(1, position));

    stops = [...stops].sort((a, b) => a.position - b.position);


    if (position <= stops[0].position)
        return stops[0].color.clone();


    if (position >= stops.at(-1).position)
        return stops.at(-1).color.clone();


    for (let i = 0; i < stops.length - 1; i++) {

        const start = stops[i];
        const end = stops[i + 1];

        if (position >= start.position && position <= end.position) {

            const t = (position - start.position) / (end.position - start.position);

            return start.color.lerp(end.color, t);
        }
    }
}
