import { getInput, time } from "../utils";

const input = getInput("2022/9");
const start = performance.now();

const touched = new Set(["0-0"]);
const h = [0, 0],
	t = [0, 0];
const abs = (n: number) => (n < 0 ? -n : n);

for (const line of input.split("\n")) {
	const [d, a] = line.split(" ");
	const n = Number(a);

	for (let j = 0; j < n; j++) {
		if (d === "L") h[0]--;
		else if (d === "R") h[0]++;
		else if (d === "U") h[1]++;
		else if (d === "D") h[1]--;
		else break;
		const difX = h[0] - t[0],
			difY = h[1] - t[1];

		if (abs(difX) === 2) {
			t[0] += difX === 2 ? 1 : -1;
			t[1] += difY;
		} else if (abs(difY) === 2) {
			t[1] += difY === 2 ? 1 : -1;
			t[0] += difX;
		}
		touched.add(t.join("-"));
	}
}
const { size } = touched;
const end = performance.now();

console.log(size, time(start, end));
