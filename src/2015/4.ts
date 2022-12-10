import md5 from "md5";
import { getInput, time } from "../utils";

const input = getInput("2015/4");
const start = performance.now();

let number = 0;

while (!md5(`${input}${number}`).startsWith("00000")) number++;
const end = performance.now();

console.log(number, time(start, end));
