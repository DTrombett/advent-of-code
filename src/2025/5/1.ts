export default (input: string) => {
	// 	input = `3-5
	// 10-14
	// 16-20
	// 12-18

	// 1
	// 5
	// 8
	// 11
	// 17
	// 32`;
	const [ranges, ingredients] = input.split("\n\n");
	const fresh = ranges!
		.split("\n")
		.map((r) => r.split("-").map(Number) as [number, number]);
	let count = 0;

	for (const id of ingredients!.split("\n")) {
		const n = +id;

		if (fresh.some(([min, max]) => n >= min && n <= max)) count++;
	}
	return count;
};
