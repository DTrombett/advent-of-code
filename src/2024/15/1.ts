const editPos: Record<string, (robot: [number, number]) => number> = {
	"<": (r) => r[1]--,
	">": (r) => r[1]++,
	v: (r) => r[0]++,
	"^": (r) => r[0]--,
};
const regexp = /#.+(?=\n)|(<|\^|>|v)+/gu;

const firstPart = (input: string) => {
	const grid: string[][] = [];
	let moves = "";
	const robot: [number, number] = [0, 0];

	for (const [match] of input.matchAll(regexp))
		if (match.startsWith("#")) {
			grid.push(match.split(""));
			if (!robot[1]) {
				robot[0] = grid.length - 1;
				robot[1] = Math.max(match.indexOf("@"), 0);
			}
		} else moves += match;
	grid[robot[0]]![robot[1]] = ".";
	for (const move of moves) {
		const oldRobot: typeof robot = [...robot];
		const edit = editPos[move]!;

		edit(robot);
		const finalPos: typeof robot = [...robot];

		while (grid[finalPos[0]]![finalPos[1]] === "O") edit(finalPos);
		if (grid[finalPos[0]]![finalPos[1]] === "#") {
			[robot[0], robot[1]] = oldRobot;
			continue;
		}
		[grid[finalPos[0]]![finalPos[1]], grid[robot[0]]![robot[1]]] = [
			grid[robot[0]]![robot[1]]!,
			grid[finalPos[0]]![finalPos[1]]!,
		];
		grid[robot[0]]![robot[1]] = "@";
		grid[robot[0]]![robot[1]] = ".";
	}
	let result = 0;

	for (let i = 1; i < grid.length - 1; i++)
		for (let j = 1; j < grid[i]!.length - 1; j++)
			if (grid[i]![j] === "O") result += 100 * i + j;
	return result;
};

export default firstPart;
