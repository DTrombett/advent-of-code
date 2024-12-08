const regexp = /[a-zA-Z0-9]/gu;

const firstPart = (input: string) => {
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
				const dx = points[i]![0] - points[j]![0];
				const dy = points[i]![1] - points[j]![1];

				for (const [x, y] of [
					[points[i]![0] + dx, points[i]![1] + dy],
					[points[j]![0] - dx, points[j]![1] - dy],
				] as const)
					if (x >= 0 && x < maxX && y >= 0 && y < maxY)
						antinodes.add(x + y * lineLength);
			}
	return antinodes.size;
};

export default firstPart;
