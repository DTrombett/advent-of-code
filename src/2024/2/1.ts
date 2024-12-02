const firstPart = (input: string) =>
	input.split("\n").filter((report) => {
		let type = 0;

		return report.split(" ").every((level, i, lvs) => {
			if (!i) return true;
			const difference = Number(level) - Number(lvs[i - 1]);
			const sign = Math.sign(difference);

			return (
				(type ||= sign) === sign &&
				difference !== 0 &&
				Math.abs(difference) <= 3
			);
		}, 0);
	}).length;

export default firstPart;
