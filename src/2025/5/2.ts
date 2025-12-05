export default (input: string) => {
	const [ranges] = input.split("\n\n");
	const fresh = ranges!
		.split("\n")
		.map(
			(r) =>
				r.split("-").map(Number) as
					| [number, number]
					| [number, number, number | undefined],
		);
	let count = 0;

	for (let i = 0; i < fresh.length; i++) {
		for (let j = fresh[i]![2] ?? 0; j < i; j++) {
			const [min, max] = fresh[j] ?? [];

			if (min == null || max == null) continue;
			if (fresh[i]![0] >= min && fresh[i]![0] <= max) fresh[i]![0] = max + 1;
			if (fresh[i]![1] >= min && fresh[i]![1] <= max) fresh[i]![1] = min - 1;
			if (fresh[i]![0] > fresh[i]![1]) {
				// eslint-disable-next-line @typescript-eslint/no-array-delete
				delete fresh[i];
				break;
			}
			if (fresh[i]![0] < min && fresh[i]![1] > max) {
				fresh.push([fresh[i]![0], min - 1, j + 1]);
				fresh[i]![0] = max + 1;
			}
		}
		if (fresh[i]) count += Math.max(fresh[i]![1] - fresh[i]![0] + 1, 0);
	}
	return count;
};
