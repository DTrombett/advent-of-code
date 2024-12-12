type Region = {
	perimeter: number;
	area: number;
};

const resolveRegion = (
	region: Region,
	regions: Region[],
	input: string,
	i: number,
	lineLength: number,
) => {
	if (regions[i]) return;
	const im = i - 1,
		iml = i - lineLength,
		ip = i + 1,
		ipl = i + lineLength;

	regions[i] = region;
	region.area++;
	if (input[iml] === input[i])
		resolveRegion(region, regions, input, iml, lineLength);
	else region.perimeter++;
	if (input[im] === input[i])
		resolveRegion(region, regions, input, im, lineLength);
	else region.perimeter++;
	if (input[ip] === input[i])
		resolveRegion(region, regions, input, ip, lineLength);
	else region.perimeter++;
	if (input[ipl] === input[i])
		resolveRegion(region, regions, input, ipl, lineLength);
	else region.perimeter++;
};

const firstPart = (input: string) => {
	const lineLength = input.indexOf("\n") + 1;
	const regions: Region[] = [];
	const resolvedRegions: Region[] = [];

	for (let i = 0; i < input.length; i++)
		if (input[i] !== "\n" && !regions[i]) {
			const im = i - 1,
				ipl = i + lineLength;
			const isNextLine = input[ipl] === input[i];

			if (input[im] === input[i]) {
				regions[i] = regions[im]!;
				if (input[i - lineLength] !== input[i]) regions[i]!.perimeter++;
				if (!isNextLine) regions[i]!.perimeter++;
				if (input[i + 1] !== input[i]) regions[i]!.perimeter++;
			} else {
				resolvedRegions.push((regions[i] = { area: 0, perimeter: 2 }));
				if (!isNextLine) regions[i]!.perimeter++;
				if (input[i + 1] !== input[i]) regions[i]!.perimeter++;
			}
			regions[i]!.area++;
			if (isNextLine)
				resolveRegion(regions[i]!, regions, input, ipl, lineLength);
		}
	return resolvedRegions.reduce((s, r) => s + r.perimeter * r.area, 0);
};

export default firstPart;
