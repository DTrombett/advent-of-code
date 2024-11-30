import { log } from "node:console";

import { getInput, time } from "../utils.js";

const input = getInput("2022/14");
const start = performance.now();
const cave: boolean[][] = [];
const sand = [0, 0];
let infinity = true,
	maxY = 0,
	units = 0;

for (const line of input.split("\n")) {
	// eslint-disable-next-line @typescript-eslint/no-loop-func
	const points = line.split(" -> ").map((a) => {
		const coord = a.split(",").map((n) => Number(n)) as [number, number];

		if (coord[1] > maxY) [, maxY] = coord;
		return coord;
	});

	for (let i = 0; i < points.length - 1; i++) {
		const [x1, y1] = points[i],
			[x2, y2] = points[i + 1];

		if (y1 === y2) {
			const max = Math.max(x1, x2);

			for (let x = Math.min(x1, x2); x <= max; x++) (cave[x] ??= [])[y1] = true;
		} else {
			const max = Math.max(y1, y2);

			for (let y = Math.min(y1, y2); y <= max; y++) (cave[x1] ??= [])[y] = true;
		}
	}
}
maxY += 1;
while (infinity) {
	sand[0] = 500;
	sand[1] = 0;
	while (true as boolean) {
		let blocked = false;

		if (!cave[sand[0]]?.[sand[1] + 1]) sand[1]++;
		else if (!cave[sand[0] - 1]?.[sand[1] + 1]) {
			sand[0]--;
			sand[1]++;
		} else if (cave[sand[0] + 1]?.[sand[1] + 1]) blocked = true;
		else {
			sand[0]++;
			sand[1]++;
		}
		if (blocked || sand[1] === maxY) {
			(cave[sand[0]] ??= [])[sand[1]] = true;
			if (sand[1] === 0) infinity = false;
			break;
		}
	}
	units++;
}
const end = performance.now();

log(units, time(start, end));
