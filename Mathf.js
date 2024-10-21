class Mathf
{
	static clamp(value, min, max)
	{
		if(value < min)
		{
			return min;
		}
		if(value > max)
		{
			return max;
		}
		return value;
	}

	static clamp01(value) { return Mathf.clamp(value, 0, 1); }
	
	static lerp(a, b, t) { return a + t * (b - a); }

	static sgn(a)
	{
		if(a < 0)
		{
			return -1;
		}
		if(a > 0)
		{
			return 1;
		}
		return 0;
	}

	//static isLerp(a, b, value) { return Mathf.contains(0, 1, Mathf.inverseLerp(a, b, value)); }

	static contains(min, max, value) { return min <= value && value <= max; }

	static inverseLerp(a, b, value) { return (value - a) / (b - a); }
}
