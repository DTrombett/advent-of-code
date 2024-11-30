const matcher = /#/gu;

const firstPart = (input: string) => {
	const lineBreak = input.indexOf("\n");
	const lineLength = lineBreak + 1;
	const toCheck: [number, number][] = [];
	const cache = new Map<`${"x" | "y"}${number}`, boolean>();
	let sum = 0;

	for (const { index } of input.matchAll(matcher)) {
		const x = index % lineLength;
		const y = Math.floor(index / lineLength);

		for (const [x1, y1] of toCheck) {
			const max = Math.max(x, x1);

			sum += Math.abs(x - x1) + y - y1;
			for (let x2 = Math.min(x, x1) + 1; x2 < max; x2++) {
				const key = `x${x2}` as const;
				const existing = cache.get(key);

				if (existing === undefined) {
					let value = true;

					for (let i = x2; i < input.length; i += lineLength)
						if (input[i] === "#") {
							cache.set(`y${Math.floor(i / lineLength)}`, false);
							value = false;
							break;
						}
					cache.set(key, value);
					if (value) sum++;
				} else if (existing) sum++;
			}
			for (let y2 = y1 + 1; y2 < y; y2++) {
				const key = `y${y2}` as const;
				const existing = cache.get(key);

				if (existing === undefined) {
					const start = y2 * lineLength;
					const i = input.slice(start, start + lineBreak).indexOf("#");
					const value = i === -1;

					cache.set(key, value);
					if (value) sum++;
					else cache.set(`x${i}`, false);
				} else if (existing) sum++;
			}
		}
		cache.set(`x${x}`, false);
		cache.set(`y${y}`, false);
		toCheck.push([x, y]);
	}
	return sum;
};

export default firstPart;
