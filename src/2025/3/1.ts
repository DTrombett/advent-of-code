const BATT = 2;

export default (input: string) =>
	input.split("\n").reduce((acc, line) => {
		const batteries = line.split("").map(Number);
		const sorted = batteries.toSorted((a, b) => b - a);
		let minL = 0;

		for (let j = BATT; j > 0; ) {
			const maxL = batteries.length - j;
			let k = 0,
				l = 0;

			for (; k < sorted.length; k++) {
				if (sorted[k] === 0) continue;
				l = minL;
				while (l < maxL && batteries[l] !== sorted[k]) l++;
				if (batteries[l] === sorted[k]) break;
			}
			minL = l + 1;
			acc += sorted[k]! * 10 ** --j;
			sorted[k] = 0;
		}
		return acc;
	}, 0);
