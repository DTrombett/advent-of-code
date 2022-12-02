import { readFileSync } from "node:fs";

const input = readFileSync("./inputs/2022/2", { encoding: "utf-8" });
///////////////////////////////////////////////////////////////////////////////

const points: Record<string, number> = {
	A: 1,
	B: 2,
	C: 3,
};
const endPoints: Record<string, number> = {
	X: 0,
	Y: 3,
	Z: 6,
};
const winners: Record<string, string> = {
	A: "B",
	B: "C",
	C: "A",
};
const calculateScore = (opponent: string, end: string): number => {
	if (end === "X")
		return points[Object.keys(winners).find((k) => winners[k] === opponent)!];
	if (end === "Y") return points[opponent];
	return points[winners[opponent]];
};
let score = 0;

for (const entry of input.split("\n")) {
	const split = entry.split(" ");
	const [opponent, end] = split;

	score += endPoints[end];
	score += calculateScore(opponent, end);
}

console.log(score);
