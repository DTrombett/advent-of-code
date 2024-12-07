const regexp = /(\d+): ((?:\d+ ?)+)/gu;

const resolveResult = (numbers: string[], t: number): boolean => {
	numbers = numbers.slice(0);
	let n = numbers.pop();

	for (; n && numbers.length && t > 0; n = numbers.pop()) {
		const s = t.toString();

		if (s.endsWith(n) && resolveResult(numbers, Number(s.slice(0, -n.length))))
			return true;
		const num = Number(n);

		if (t % num === 0 && resolveResult(numbers, t / num)) return true;
		t -= num;
	}
	return t === Number(n);
};

const secondPart = (input: string) => {
	let total = 0;

	for (const [, r, n] of input.matchAll(regexp)) {
		const result = Number(r);

		if (resolveResult(n!.split(" "), result)) total += result;
	}
	return total;
};

export default secondPart;
