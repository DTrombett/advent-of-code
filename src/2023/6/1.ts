const matcher = /Time:\s+(?<time>.+)\nDistance:\s+(?<distance>.+)/u;

const firstPart = (input: string) => {
	const match = matcher.exec(input)!;
	const time = match.groups!.time.split(/\s+/gu);
	const distance = match.groups!.distance.split(/\s+/gu);
	let margin = 1;

	for (let i = 0; i < time.length; i++) {
		const a = parseInt(time[i], 10);
		const delta = Math.sqrt(a ** 2 - 4 * parseInt(distance[i], 10));

		margin *= Math.ceil((a + delta) / 2) - Math.floor((a - delta) / 2) - 1;
	}
	return margin;
};

export default firstPart;
