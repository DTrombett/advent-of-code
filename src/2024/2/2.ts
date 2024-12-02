const secondPart = (input: string) =>
	input.split("\n").filter((report) => {
		let type = 0;
		const isSafe = (a?: string, b?: string) => {
			const difference = Number(a) - Number(b);
			const sign = Math.sign(difference);

			return (
				(type ||= sign) === sign &&
				difference !== 0 &&
				Math.abs(difference) <= 3
			);
		};
		const levels = report.split(" ");
		const badLevel = levels.findIndex(
			(level, i, lvs) => i && !isSafe(level, lvs[i - 1]),
		);
		let safe = badLevel === -1;

		for (let i = Math.max(badLevel - 2, 0); !safe && i <= badLevel; i++) {
			const newLevels = levels.toSpliced(i, 1);

			type = 0;
			safe = newLevels.every((a, j, lvs) => !j || isSafe(a, lvs[j - 1]));
		}
		return safe;
	}).length;

export default secondPart;
