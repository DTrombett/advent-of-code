export default (input: string) =>
	input.split(",").reduce((acc, line) => {
		// eslint-disable-next-line prefer-const
		let [a, b] = line.split("-").map(Number) as [number, number];

		for (; a <= b; a++) if (String(a).match(/^(\d+)\1+$/)) acc += a;
		return acc;
	}, 0);
