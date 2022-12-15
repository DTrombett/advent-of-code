import { getInput, time } from "../utils";

const input = getInput("2022/15");
const start = performance.now();

const bacons: string[] = [];
const max = 4_000_000;
let position: [number, number] | undefined;
const sensors = input.split("\n").map((line) => {
	const split = line.split(/(at|:) /g);
	const coord = [split[2], split[6]].map((a) =>
		a.split(", ").map((n) => Number(n.slice(2)))
	);
	const diff =
		Math.abs(coord[0][0] - coord[1][0]) + Math.abs(coord[0][1] - coord[1][1]);

	bacons.push(coord[1].join("-"));
	return {
		coord: coord[0] as [number, number],
		diff,
	};
});

for (const s of sensors) {
	const firstY = s.coord[1] + s.diff + 1;

	for (
		let done = false, [x] = s.coord, y = firstY;
		!(position || (x === s.coord[0] && y === firstY && done));
		done = true,
			x >= s.coord[0] && y > s.coord[1]
				? (x++, y--)
				: y <= s.coord[1] && x > s.coord[0]
				? (x--, y--)
				: x <= s.coord[0] && y < s.coord[1]
				? (x--, y++)
				: (x++, y++)
	)
		if (
			x >= 0 &&
			x <= max &&
			y >= 0 &&
			y <= max &&
			sensors.every(
				(p) => Math.abs(x - p.coord[0]) + Math.abs(y - p.coord[1]) > p.diff
			)
		)
			position = [x, y];
	if (position) break;
}
const result = position![0] * 4_000_000 + position![1];
const end = performance.now();

console.log(result, time(start, end));
