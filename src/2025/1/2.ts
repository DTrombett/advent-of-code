export default (input: string) =>
	input.split("\n").reduce(
		(acc, line) => {
			let n = +line.slice(1);

			if (line[0] === "L") {
				if (acc[1] && n >= acc[1]) n += 100;
				n *= -1;
			}
			acc[1] += n;
			acc[0] += Math.floor(Math.abs(acc[1] / 100));
			acc[1] %= 100;
			if (acc[1] < 0) acc[1] += 100;
			return acc;
		},
		[0, 50] as [number, number],
	)[0];
