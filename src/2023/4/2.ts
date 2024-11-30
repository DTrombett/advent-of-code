const regexp = /Card\s+(?<card>\d+):\s+(?<winning>.*)\s+\|\s+(?<mine>.*)/gu;

const secondPart = (input: string) => {
	let total = 0;
	const repeat: (number | undefined)[] = [];

	for (const match of input.matchAll(regexp)) {
		if (!match.groups) continue;
		const cardNumber = parseInt(match.groups.card, 10);
		const winning = match.groups.winning.split(/\s+/u);
		let matching = 0;

		total += (repeat[cardNumber] ?? 0) + 1;
		for (const number of match.groups.mine.split(/\s+/u))
			if (winning.includes(number)) {
				const nextNumber = cardNumber + ++matching;

				repeat[nextNumber] =
					(repeat[nextNumber] ?? 0) + (repeat[cardNumber] ?? 0) + 1;
			}
	}
	return total;
};

export default secondPart;
