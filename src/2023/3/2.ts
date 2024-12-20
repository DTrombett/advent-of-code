const isNumber = (char: string) => char >= "0" && char <= "9";

const secondPart = (input: string) => {
	const split = input.split("\n");
	let sum = 0;

	for (let y = 0; y < split.length; y++)
		for (let x = 0; x < split[y].length; x++) {
			if (split[y][x] !== "*") continue;
			let found = 0;
			let ratio = 1;
			const lastLine = split[y - 1];

			if (lastLine)
				for (let x1 = x - 1; x1 <= x + 1; x1++)
					if (isNumber(lastLine[x1])) {
						if (found === 2) {
							found++;
							break;
						}
						let x2 = x1 - 1;

						while (isNumber(lastLine[x2])) x2--;
						const number = parseInt(lastLine.slice(x2 + 1), 10);

						ratio *= number;
						found++;
						x1 = x2 + number.toString().length;
					}
			if (found === 3) continue;
			const nextLine = split[y + 1];

			if (nextLine)
				for (let x1 = x - 1; x1 <= x + 1; x1++)
					if (isNumber(nextLine[x1])) {
						if (found === 2) {
							found++;
							break;
						}
						let x2 = x1 - 1;

						while (isNumber(nextLine[x2])) x2--;
						const number = parseInt(nextLine.slice(x2 + 1), 10);

						ratio *= number;
						found++;
						x1 = x2 + number.toString().length;
					}
			if (found === 3) continue;
			if (isNumber(split[y][x - 1])) {
				if (found === 2) continue;
				let x2 = x - 1;

				while (isNumber(split[y][x2])) x2--;
				ratio *= parseInt(split[y].slice(x2 + 1, x), 10);
				found++;
			}
			if (found === 0) continue;
			if (isNumber(split[y][x + 1])) {
				if (found === 2) continue;
				const number = parseInt(split[y].slice(x + 1), 10);

				ratio *= number;
				x += number.toString().length;
				found++;
			}
			if (found === 2) sum += ratio;
		}
	return sum;
};

export default secondPart;
