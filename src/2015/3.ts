import { getInput, time } from "../utils";

const input = getInput("2015/3");
const start = performance.now();

const visited = new Set(["0-0"]);
const position = [0, 0];

for (const char of input) {
	switch (char) {
		case "^":
			position[1]++;
			break;
		case "v":
			position[1]--;
			break;
		case "<":
			position[0]--;
			break;
		case ">":
			position[0]++;
			break;
		default:
			break;
	}
	visited.add(position.join("-"));
}
const { size } = visited;
const end = performance.now();

console.log(size, time(start, end));
