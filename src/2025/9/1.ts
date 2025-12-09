export default (input: string) => {
	const coord = input
		.split("\n")
		.map((l) => l.split(",").map(Number) as [number, number]);
	let best = 0;

	for (let i = 0; i < coord.length; i++)
		for (let j = i + 1; j < coord.length; j++) {
			const d =
				(Math.abs(coord[i]![0] - coord[j]![0]) + 1) *
				(Math.abs(coord[i]![1] - coord[j]![1]) + 1);

			if (d > best) best = d;
		}
	return best;
};
