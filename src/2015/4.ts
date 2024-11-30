import { log } from "node:console";
import { createHash } from "node:crypto";
import { getInput, time } from "../utils.js";

const input = getInput("2015/4");
const start = performance.now();

let number = 0;

while (
	!createHash("md5")
		.update(`${input}${number}`)
		.digest("hex")
		.startsWith("000000")
)
	number++;
const end = performance.now();

log(number, time(start, end));
