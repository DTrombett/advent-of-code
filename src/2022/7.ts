/* eslint-disable guard-for-in */
import { getInput, time } from "../utils";

type Dir = {
	[_ in string]?: Dir | number;
};
const input = getInput("2022/7");
const start = performance.now();

const commands = input.split("\n");
const dirs: Dir = {};
const currentDir: string[] = [];
const sizes: number[] = [];
let sum = 0;
const resolveDir = () =>
	currentDir.reduce((current, name) => (current[name] ??= {}) as Dir, dirs);
const getDirSize = (dir = dirs) => {
	let s = 0;

	for (const key in dir) {
		const d = dir[key];

		s += typeof d === "number" ? d : getDirSize(d);
	}
	if (s <= 100_000) sum += s;
	sizes.push(s);
	return s;
};

for (const cmd of commands) {
	const split = cmd.split(" ");

	if (split[0] === "$") {
		if (split[1] === "cd")
			if (split[2] === "/") currentDir.length = 0;
			else if (split[2] === "..") currentDir.pop();
			else currentDir.push(split[2]);
	} else resolveDir()[split[1]] = split[0] === "dir" ? {} : Number(split[0]);
}
const neededSpace = getDirSize() - 40_000_000;
let folderToDelete = Infinity;

for (const s of sizes)
	if (s > neededSpace && s < folderToDelete) folderToDelete = s;
const end = performance.now();

console.log(sum, folderToDelete, time(start, end));
