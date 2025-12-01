const dir = { L: -1, R: 1 };

export default (input: string) =>
	input.split("\n").reduce(
		(acc, line) => {
			acc[1] = (acc[1] + +line.slice(1) * dir[line[0] as "L" | "R"]) % 100;
			if (acc[1] < 0) acc[1] += 100;
			else if (acc[1] === 0) acc[0]++;
			return [acc[0], acc[1]] as [number, number];
		},
		[0, 50] as [number, number],
	)[0];
