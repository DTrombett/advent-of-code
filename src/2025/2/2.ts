export default (input: string) =>
	input.split(",").reduce((acc, line) => {
		// eslint-disable-next-line prefer-const
		let [a, b] = line.split("-").map(Number) as [number, number];

		for (; a <= b; a++) {
			const digits = Math.floor(Math.log10(a)) + 1;

			for (let td = Math.floor(digits / 2); td > 0; td--)
				if (digits % td === 0) {
					const mod = a % 10 ** td;
					let inv = true;

					for (let pos = 10 ** td; pos < 10 ** digits; )
						if (Math.floor(1 / (pos / (a % (pos *= 10 ** td)))) !== mod) {
							inv = false;
							break;
						}
					if (inv) {
						acc += a;
						break;
					}
				}
		}
		return acc;
	}, 0);
