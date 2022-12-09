/* eslint-disable sort-vars */
import { getInput, time } from "../utils";

const input = getInput("2022/9");
const start = performance.now();

// NOTE: This actually gives a wrong result
const touched = new Set(["0-0"]);
const knotsCount = 10,
	knots = Array.from({ length: knotsCount + 1 }, () => [0, 0]);
const [head] = knots;

for (const line of input.split("\n")) {
	const [d, _n] = line.split(" ");
	const n = Number(_n);

	for (let j = 0; j < n; j++) {
		if (d === "L") head[0]--;
		else if (d === "R") head[0]++;
		else if (d === "U") head[1]++;
		else if (d === "D") head[1]--;
		else break;
		for (let k = 1; k < knots.length; k++) {
			const prevKnot = knots[k - 1],
				difX = prevKnot[0] - knots[k][0],
				difY = prevKnot[1] - knots[k][1];

			if (Math.abs(difX) > 1) {
				knots[k][0] += difX > 1 ? 1 : -1;
				knots[k][1] += difY > 0 ? 1 : -1;
			}
			if (Math.abs(difY) > 1) {
				knots[k][1] += difY > 1 ? 1 : -1;
				knots[k][0] += difX > 0 ? 1 : -1;
			}
		}
		touched.add(knots.at(-1)!.join("-"));
	}
}
const { size } = touched;
const end = performance.now();

console.log(size, time(start, end));
