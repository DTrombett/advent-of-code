/* eslint-disable @typescript-eslint/no-array-delete */
/* eslint-disable @typescript-eslint/no-loop-func */
import { log } from "node:console";
import { getInput, time } from "../utils.js";

type Coordinates = [number, number][];
type Rock = {
	positions: Coordinates;
	left?: Coordinates;
	right?: Coordinates;
	down?: Coordinates;
};
const input = getInput("2022/17");
const start = performance.now();

let cave: boolean[][] = [];
let k = 0;
const rocks: Rock[] = [
	{
		positions: [
			[0, 0],
			[0, 1],
			[0, 2],
			[0, 3],
		],
		left: [[0, 0]],
		right: [[0, 3]],
	},
	{
		positions: [
			[0, 1],
			[1, 0],
			[1, 1],
			[1, 2],
			[2, 1],
		],
		left: [
			[1, 0],
			[0, 1],
			[2, 1],
		],
		right: [
			[1, 2],
			[0, 1],
			[2, 1],
		],
		down: [
			[0, 1],
			[1, 0],
			[1, 2],
		],
	},
	{
		positions: [
			[0, 0],
			[0, 1],
			[0, 2],
			[1, 2],
			[2, 2],
		],
		left: [
			[0, 0],
			[1, 2],
			[2, 2],
		],
		right: [
			[0, 2],
			[1, 2],
			[2, 2],
		],
		down: [
			[0, 0],
			[0, 1],
			[0, 2],
		],
	},
	{
		positions: [
			[0, 0],
			[1, 0],
			[2, 0],
			[3, 0],
		],
		down: [[0, 0]],
	},
	{
		positions: [
			[0, 0],
			[0, 1],
			[1, 0],
			[1, 1],
		],
		down: [
			[0, 0],
			[0, 1],
		],
		left: [
			[0, 0],
			[1, 0],
		],
		right: [
			[0, 1],
			[1, 1],
		],
	},
];
const writeRock = (rock: Rock, yOffset: number, xOffset: number) => {
	for (const [y1, x1] of rock.positions)
		(cave[yOffset + y1] ??= [])[x1 + xOffset] = true;
};
const deleteRock = (rock: Rock, yOffset: number, xOffset: number) => {
	for (const [y1, x1] of rock.positions)
		delete cave[yOffset + y1][x1 + xOffset];
};

for (let i = 0; i < 2022; i++) {
	cave = cave.filter((p) => p.filter((a) => a).length);
	const rock = rocks[i % rocks.length];
	let yOffset = cave.length + 3;
	let xOffset = 2;

	cave.push([], [], []);
	writeRock(rock, yOffset, xOffset);
	for (
		;
		yOffset > 0 &&
		(rock.down ?? rock.positions).every(
			(p) => !cave[p[0] + yOffset]?.[p[1] + xOffset],
		);
		yOffset--
	) {
		const instruction = input[k];

		if (instruction === "<") {
			if (
				xOffset &&
				(rock.left ?? rock.positions).every(
					(p) => !cave[yOffset + p[0]]?.[p[1] + xOffset - 1],
				)
			) {
				deleteRock(rock, yOffset, xOffset--);
				writeRock(rock, yOffset, xOffset);
			}
		} else if (
			instruction === ">" &&
			xOffset + (rock.right ?? rock.positions)[0][1] < 6 &&
			(rock.right ?? rock.positions).every(
				(p) => !cave[yOffset + p[0]]?.[p[1] + xOffset + 1],
			)
		) {
			deleteRock(rock, yOffset, xOffset++);
			writeRock(rock, yOffset, xOffset);
		}
		k++;
	}
}
const { length } = cave;
const end = performance.now();

log(length, time(start, end));
