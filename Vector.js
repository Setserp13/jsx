function map(func, ...arrays)
{
	const length = arrays[0].length;
	if (!arrays.every(arr => arr.length === length))
	{
		throw new Error("All arrays must be of the same length");
	}
	const result = [];
	for (let i = 0; i < length; i++)
	{
		const elements = arrays.map(arr => arr[i]);
		result.push(func(...elements));
	}
	return result;
}

class Vector extends Array
{
	constructor(...args) { super(...args); }

	get x() { return this[0]; }

	get y() { return this[1]; }

	get z() { return this[2]; }

	get w() { return this[3]; }

	set x(value) { this[0] = value; }

	set y(value) { this[1] = value; }

	set z(value) { this[2] = value; }

	set w(value) { this[3] = value; }

	op(value, func)
	{
		if(typeof value == 'number')
		{
			return new Vector(...map((a) => func(a, value), this));
		}
		return new Vector(...map((a, b) => func(a, b), this, value));
	}

	add(value) { return this.op(value, (a, b) => a + b); }

	sub(value) { return this.op(value, (a, b) => a - b); }

	mul(value) { return this.op(value, (a, b) => a * b); }

	div(value) { return this.op(value, (a, b) => a / b); }

	ceil() { return new Vector(...this.map(Math.ceil)); }

	floor() { return new Vector(...this.map(Math.floor)); }
}

class Rect
{
	constructor(min, size)
	{
		this.min = min;
		this.size = size;
	}
	
	get center() { return this.min.add(this.extents) }

	get extents() { return this.size.mul(0.5) }

	get max() { return this.min.add(this.size) }

	normalizePoint(point) { return point.sub(this.min).div(this.size); }

	denormalizePoint(point) { return point.mul(this.size).add(this.min); }

	normalizeVector(vector) { return point.div(this.size); }

	denormalizeVector(vector) { return point.mul(this.size); }

	normalizeRect(rect)
	{
		return new Rect(normalizePoint(rect.min), normalizeVector(rect.size))
	}

	denormalizeRect(rect)
	{
		return new Rect(denormalizePoint(rect.min), denormalizeVector(rect.size))
	}
}

class Grid
{
	constructor(cellSize, cellGap = new Vector(0,0), offset = new Vector(0,0))
	{
		this.cellSize = cellSize;
		this.cellGap = cellGap;
		this.offset = offset;
	}
	
	cellToPoint(value)
	{
		return this.offset.add(this.cellSize.add(this.cellGap).mul(value));
	}

	pointToCell(value)
	{
		return value.sub(this.offset).div(this.cellSize.add(this.cellGap)).floor();
	}

	cell(...coord)
	{
		return new Rect(this.cellToPoint(new Vector(...coord)), this.cellSize);
	}
}
