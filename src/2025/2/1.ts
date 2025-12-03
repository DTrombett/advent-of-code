export default (input: string) =>
	input.split(",").reduce((acc, line) => {
		// eslint-disable-next-line prefer-const
		let [a, b] = line.split("-").map(Number) as [number, number];

		for (; a <= b; a++) {
			const s = String(a);

			if (s.length % 2) {
				a = 10 ** s.length + 10 ** Math.floor(s.length / 2) - 1;
				continue;
			}
			if (s.match(/^(\d+)\1$/)) acc += a;
		}
		return acc;
	}, 0);
