const matcher = /(\d+(\s|))+/g;

export const firstPart = (input: string) => {
	const match = input.match(matcher)!;
	const maps = match.slice(1).map((strings) =>
		strings
			.trimEnd()
			.split("\n")
			.map((line) => {
				const map = line.split(" ").map((n) => parseInt(n));

				return [map[1], map[1] + map[2], map[0] - map[1]];
			})
	);
	let location = Infinity;

	for (const s of match[0].trimEnd().split(" ")) {
		let seed = parseInt(s);

		for (const map of maps)
			for (const [start, end, diff] of map)
				if (seed >= start && end >= seed) {
					seed += diff;
					break;
				}
		if (seed < location) location = seed;
	}
	return location;
};

export default firstPart;
