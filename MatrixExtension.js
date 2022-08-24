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