import { getInput, time } from "../utils";

const input = getInput("2015/1");
const start = performance.now();

const result = input.match(/\(/g)!.length * 2 - input.length;

const end = performance.now();

console.log(result, time(start, end));
