const dist = (
	a: [number, number, number, ...any[]],
	b: [number, number, number, ...any[]],
) =>
	Math.pow(a[0] - b[0], 2) +
	Math.pow(a[1] - b[1], 2) +
	Math.pow(a[2] - b[2], 2);
const bits = (1 << 10) - 1;

export default (input: string) => {
	const circuits: number[][] = [];
	const coord = input
		.split("\n")
		.map(
			(l, i) =>
				[...l.split(",").map(Number), (circuits[i] = [i])] as [
					number,
					number,
					number,
					circuit: number[],
				],
		);
	const combinations: [dist: number, comb: number][] = [];

	for (let i = 0; i < coord.length; i++) {
		let comb = (i << 10) + i + 1;

		for (let j = i + 1; j < coord.length; j++)
			combinations.push([dist(coord[i]!, coord[j]!), comb++]);
	}
	combinations.sort(([a], [b]) => a - b);
	for (let i = 0; i < 1000; i++) {
		const a = combinations[i]![1] >>> 10;
		const b = combinations[i]![1] & bits;

		if (coord[a]![3] !== coord[b]![3])
			for (const element of coord[b]![3]) {
				coord[a]![3].push(element);
				coord[element]![3] = coord[a]![3];
				delete circuits[element];
			}
	}
	circuits.sort((a, b) => b.length - a.length);
	return circuits[0]!.length * circuits[1]!.length * circuits[2]!.length;
};
