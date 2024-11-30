const matcher = /(\d+(\s|))+/gu;
const seedMatcher = /\d+\s\d+/gu;

export const secondPart = (input: string) => {
	const match = input.match(matcher)!;
	const seeds = match[0]
		.trimEnd()
		.match(seedMatcher)!
		.map((range) => range.split(" ").map((s) => parseInt(s, 10)));
	const handled = new Set<number[]>();

	for (const strings of match.slice(1)) {
		const map = strings
			.trimEnd()
			.split("\n")
			.map((line) => line.split(" ").map((n) => parseInt(n, 10)));

		for (const [destination, start, range] of map) {
			const end = start + range;
			const mapDiff = destination - start;
			const newRanges: typeof seeds = [];

			for (const seed of seeds) {
				if (handled.has(seed)) continue;
				const seedEnd = seed[0] + seed[1];

				if (seed[0] >= start) {
					if (end >= seedEnd) {
						// start seedStart seedEnd end
						seed[0] += mapDiff;
						handled.add(seed);
					} else if (end >= seed[0]) {
						// start seedStart end seedEnd
						newRanges.push(
							// end seedEnd
							[range + destination, seedEnd - end],
						);
						// seedStart end
						seed[1] = end - seed[0];
						seed[0] += seed[1] ? mapDiff : Infinity;
						handled.add(seed);
					}
					continue;
				}
				if (seedEnd >= end) {
					// seedStart start end seedEnd
					newRanges.push(
						// seedStart start
						[seed[0], start - seed[0]],
						// end seedEnd
						[end, seedEnd - end],
					);
					// start end
					seed[0] = destination;
					seed[1] = range;
					handled.add(seed);
					continue;
				}
				if (seedEnd >= start) {
					// seedStart start seedEnd end
					newRanges.push(
						// seedStart start
						[seed[0], start - seed[0]],
					);
					// start seedEnd
					seed[1] += seed[0] - start;
					seed[0] = seed[1] ? destination : Infinity;
					handled.add(seed);
				}
			}
			seeds.push(...newRanges);
		}
		handled.clear();
	}
	return seeds.reduce((min, [start]) => (start < min ? start : min), Infinity);
};

export default secondPart;
