import { getInput, time } from "../utils";

const input = getInput("2022/15");
const start = performance.now();

const y = 2_000_000;
let maxX = -Infinity,
	minX = Infinity;
let coverage = 0;
const bacons: string[] = [];
const sensors = input.split("\n").map((line) => {
	const split = line.split(/(at|:) /g);
	const coord = [split[2], split[6]].map((a) =>
		a.split(", ").map((n) => Number(n.slice(2)))
	);
	const diff =
		Math.abs(coord[0][0] - coord[1][0]) + Math.abs(coord[0][1] - coord[1][1]);

	if (coord[0][0] - diff < minX) minX = coord[0][0] - diff;
	if (coord[0][0] + diff > maxX) maxX = coord[0][0] + diff;
	bacons.push(coord[1].join("-"));
	return {
		coord: coord[0] as [number, number],
		diff,
	};
});

for (let x = minX; x <= maxX; x++)
	if (
		!bacons.includes(`${x}-${y}`) &&
		sensors.some(
			(s) => Math.abs(x - s.coord[0]) + Math.abs(y - s.coord[1]) <= s.diff
		)
	)
		coverage++;
const end = performance.now();

console.log(coverage, time(start, end));
