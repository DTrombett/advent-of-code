const firstPart = (input: string) => {
	const map = input.split("\n");
	const start: number[] = [];

	start[1] = map.findIndex((line) => (start[0] = line.indexOf("S")) !== -1);
	let old = start;
	let current!: number[];
	let i = 1;
	const points: string[] = [start.join()];

	if (["|", "7", "F"].includes(map[start[1] - 1][start[0]]))
		current = [start[0], start[1] - 1];
	else if (["-", "7", "J"].includes(map[start[1]][start[0] + 1]))
		current = [start[0] + 1, start[1]];
	else if (["|", "L", "J"].includes(map[start[1] + 1][start[0]]))
		current = [start[0], start[1] + 1];
	else if (["-", "L", "F"].includes(map[start[1]][start[0] - 1]))
		current = [start[0] - 1, start[1]];
	do {
		const last = old;

		old = [...current];
		points.push(old.join());
		switch (map[current[1]][current[0]]) {
			case "|":
				current[1] += current[1] - last[1];
				break;
			case "7":
				if (last[0] === current[0] - 1) current[1]++;
				else current[0]--;
				break;
			case "F":
				if (last[0] === current[0] + 1) current[1]++;
				else current[0]++;
				break;
			case "-":
				current[0] += current[0] - last[0];
				break;
			case "J":
				if (last[0] === current[0] - 1) current[1]--;
				else current[0]--;
				break;
			case "L":
				if (last[0] === current[0] + 1) current[1]--;
				else current[0]++;
				break;
			default:
		}
		i++;
	} while (current.some((c, j) => start[j] !== c));
	const lx = map[0].length / 4;
	const ly = map.length / 4;

	return map
		.slice(ly, -ly)
		.reduce(
			(sum, line, y) =>
				sum +
				[...line.slice(lx, -lx)].filter(
					(_, x) => !points.includes(`${y + ly},${x + lx}`),
				).length,
			0,
		);
};

export default firstPart;
