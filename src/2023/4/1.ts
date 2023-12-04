const regexp = /Card\s+\d+:\s+(?<winning>.*)\s+\|\s+(?<mine>.*)/g;

const firstPart = (input: string) => {
	let sum = 0;

	for (const match of input.matchAll(regexp)) {
		if (!match.groups) continue;
		const winning = match.groups.winning.split(/\s+/);
		let points = -1;

		for (const number of match.groups.mine.split(/\s+/))
			if (winning.includes(number)) points++;
		if (points !== -1) sum += 2 ** points;
	}
	return sum;
};

export default firstPart;
