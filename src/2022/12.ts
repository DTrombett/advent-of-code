import { getInput, time } from "../utils";

const input = getInput("2022/12");
const start = performance.now();

const letters = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];
const a = "a".codePointAt(0)!;
let endPosition: [number, number] | undefined,
	startPosition: [number, number] | undefined;
const square = input.split("\n").map((v, x) =>
	v.split("").map((s, y) => {
		if (s === "S") startPosition = [x, y];
		else if (s === "E") endPosition = [x, y];
		return s.codePointAt(0)! - a;
	})
);
const end = performance.now();

console.log(startPosition, endPosition, time(start, end));
