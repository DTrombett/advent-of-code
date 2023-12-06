const matcher = /Time:\s+(?<time>.+)\nDistance:\s+(?<distance>.+)/;

const secondPart = (input: string) => {
	const match = input.match(matcher)!;
	const time = parseInt(match.groups!.time.replace(/\s+/g, ""));
	const delta = Math.sqrt(
		time ** 2 - 4 * parseInt(match.groups!.distance.replace(/\s+/g, ""))
	);

	return Math.ceil((time + delta) / 2) - Math.floor((time - delta) / 2) - 1;
};

export default secondPart;
