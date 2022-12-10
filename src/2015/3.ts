import { getInput, time } from "../utils";

const input = getInput("2015/3");
const start = performance.now();

const visited = new Set(["0-0"]);
const positions = [
	[0, 0],
	[0, 0],
];
let turn = 0;

for (const char of input) {
	switch (char) {
		case "^":
			positions[turn][1]++;
			break;
		case "v":
			positions[turn][1]--;
			break;
		case "<":
			positions[turn][0]--;
			break;
		case ">":
			positions[turn][0]++;
			break;
		default:
			break;
	}
	visited.add(positions[turn].join("-"));
	turn = turn - 1 && 1;
}
const { size } = visited;
const end = performance.now();

console.log(size, time(start, end));
