const matcher = /Time:\s+(?<time>.+)\nDistance:\s+(?<distance>.+)/u;

const secondPart = (input: string) => {
	const match = matcher.exec(input)!;
	const time = parseInt(match.groups!.time.replace(/\s+/gu, ""), 10);
	const delta = Math.sqrt(
		time ** 2 - 4 * parseInt(match.groups!.distance.replace(/\s+/gu, ""), 10),
	);

	return Math.ceil((time + delta) / 2) - Math.floor((time - delta) / 2) - 1;
};

export default secondPart;
