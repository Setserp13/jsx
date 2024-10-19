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