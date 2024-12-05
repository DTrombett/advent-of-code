const secondPart = (input: string) => {
	const [rules, updates] = input.split("\n\n");
	let result = 0;

	for (const update of updates!.split("\n")) {
		const arr = update
			.split(",")
			.sort((a, b) =>
				rules!.includes(`${a}|${b}`)
					? -1
					: Number(rules!.includes(`${b}|${a}`)),
			);

		if (arr.join(",") !== update)
			result += Number(arr[Math.floor(arr.length / 2)]);
	}
	return result;
};

export default secondPart;
