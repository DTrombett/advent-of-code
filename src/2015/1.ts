import { getInput, time } from "../utils";

const input = getInput("2015/1");
const start = performance.now();

const values: Record<string, number> = {
	"(": 1,
	")": -1,
};
let floor = 0;

const result =
	input.split("").findIndex((v) => (floor += values[v]) === -1) + 1;
const end = performance.now();

console.log(result, time(start, end));
