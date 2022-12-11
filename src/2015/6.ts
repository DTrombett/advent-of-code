import { getInput, time } from "../utils";

const input = getInput("2015/6");
const start = performance.now();

const lines = input.split("\n");
const lights = Array.from({ length: 1_000 }, () =>
	new Array<boolean>(1_000).fill(false)
);

for (const l of lines) {
	const split = l.split(" ");

	if (split[0] === "turn") split.splice(0, 1);
	const [startX, startY, endX, endY] = [split[1], split[3]].flatMap((el) =>
		el.split(",").map((n) => Number(n))
	);

	for (let x = startX; x <= endX; x++)
		for (let y = startY; y <= endY; y++)
			lights[x][y] =
				split[0] === "on" ? true : split[0] === "off" ? false : !lights[x][y];
}
const on = lights.flat().filter((v) => v).length;
const end = performance.now();

console.log(on, time(start, end));
