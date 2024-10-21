function fromFunction(length, func)
{
	var result = [];
	for(var i = 0; i < length; i++)
	{
		result.push(func(i));
	}
	return result;
}

function full(length, value) { return fromFunction(length, (i) => { return value; }) }
}

function fromFunction2(width, height, func)
{
	var result = [];
	for(var i = 0; i < width; i++)
	{
		var row = [];
		for(var j = 0; j < height; j++)
		{
			row.push(func(i, j));
		}
		result.push(row);
	}
	return result;
}

function full2(width, height, value) { return fromFunction2(width, height, (i, j) => { return value; }) }



Array.prototype.size2 = function()
{
	return [this.length, this[0].length];
}

Array.prototype.inRange2 = function(i, j)
{
	return i > -1 && i < this.size()[0] && j > -1 && j < this.size()[1];
}

Array.prototype.addColumn = function(column)
{
	for(var i = 0; i < this.length; i++)
	{
		this[i].push(column[i]);
	}
	return this;
}


Array.prototype.getColumns = function(indices)
{
	return map(this, (obj) => { return getItems(obj, indices); });
}

Array.prototype.map2 = function(func)
{
	var result = [];
	for(var i = 0; i < this.length; i++)
	{
		result.push([]);
		for(var j = 0; j < this[i].length; j++)
		{
			result[i].push(func(this[i][j], i, j));
		}
	}
	return result;
}

Array.prototype.forEach2 = function(action)
{
	for(var i = 0; i < this.length; i++)
	{
		for(var j = 0; j < this[i].length; j++)
		{
			action(this[i][j], i, j);
		}
	}
}

Array.prototype.transpose = function()
{
	return this.map2((obj, i, j) => { return obj[j][i]; });
}

//Both rows and columns are arrays

Array.prototype.column = function(index)
{
	var result = [];
	for(var i = 0; i < this.length; i++)
	{
		result.push(this[i][index]);
	}
	return result;
}

Array.prototype.row = function(index)
{
	var result = [];
	for(var i = 0; i < this[0].length; i++)
	{
		result.push(this[index][i]);
	}
	return result;
}
