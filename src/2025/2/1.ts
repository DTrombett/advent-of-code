export default (input: string) =>
	input.split(",").reduce((acc, line) => {
		// eslint-disable-next-line prefer-const
		let [a, b] = line.split("-").map(Number) as [number, number];

		for (; a <= b; a++) {
			const log = Math.floor(Math.log10(a)) + 1;

			if (log % 2 === 0) {
				const mod = 10 ** (log / 2);

				if (a % mod === Math.floor(a / mod)) acc += a;
			}
		}
		return acc;
	}, 0);
