const isSymbol = (char: string) => char !== "." && (char < "0" || char > "9");

const firstPart = (input: string) => {
	const split = input.split("\n");
	let sum = 0;

	for (let y = 0; y < split.length; y++)
		for (let x = 0; x < split[y].length; x++) {
			const number = parseInt(split[y].slice(x), 10);

			if (Number.isNaN(number)) continue;
			const { length } = number.toString();
			const lastLine = split[y - 1];
			let found = false;

			if (lastLine)
				for (let x1 = x - 1; x1 <= x + length; x1++)
					if (isSymbol(lastLine[x1])) {
						sum += number;
						found = true;
						break;
					}
			if (found) {
				x += length - 1;
				continue;
			}
			const nextLine = split[y + 1];

			if (nextLine)
				for (let x1 = x - 1; x1 <= x + length; x1++)
					if (isSymbol(nextLine[x1])) {
						sum += number;
						found = true;
						break;
					}
			if (found) {
				x += length - 1;
				continue;
			}
			if (isSymbol(split[y][x - 1]) || isSymbol(split[y][x + length])) {
				sum += number;
				x += length - 1;
			}
		}
	return sum;
};

export default firstPart;
