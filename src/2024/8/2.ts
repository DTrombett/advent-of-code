const regexp = /[a-zA-Z0-9]/gu;

const secondPart = (input: string) => {
	const maxX = input.indexOf("\n");
	const lineLength = maxX + 1;
	const maxY = Math.ceil(input.length / lineLength);
	const antennas: Record<string, [x: number, y: number][]> = {};

	for (const { index, 0: frequency } of input.matchAll(regexp))
		(antennas[frequency] ??= []).push([
			index % lineLength,
			Math.floor(index / lineLength),
		]);
	const antinodes = new Set<number>();

	for (const points of Object.values(antennas))
		for (let i = 0; i < points.length - 1; i++)
			for (let j = i + 1; j < points.length; j++) {
				let [x, y] = points[i]!;
				const dx = x - points[j]![0];
				const dy = y - points[j]![1];

				do antinodes.add(x + y * lineLength);
				while ((x += dx) >= 0 && x < maxX && (y += dy) >= 0 && y < maxY);
				[x, y] = points[j]!;
				do antinodes.add(x + y * lineLength);
				while ((x -= dx) >= 0 && x < maxX && (y -= dy) >= 0 && y < maxY);
			}
	return antinodes.size;
};

export default secondPart;
