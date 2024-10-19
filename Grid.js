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
		return new Rect2(this.cellToPoint(new Vector(...coord)), this.cellSize);
	}
}