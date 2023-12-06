const matcher = /Time:\s+(?<time>.+)\nDistance:\s+(?<distance>.+)/;

const firstPart = (input: string) => {
	const match = input.match(matcher)!;
	const time = match.groups!.time.split(/\s+/g);
	const distance = match.groups!.distance.split(/\s+/g);
	let margin = 1;

	for (let i = 0; i < time.length; i++) {
		const a = parseInt(time[i]);
		const delta = Math.sqrt(a ** 2 - 4 * parseInt(distance[i]));

		margin *= Math.ceil((a + delta) / 2) - Math.floor((a - delta) / 2) - 1;
	}
	return margin;
};

export default firstPart;
