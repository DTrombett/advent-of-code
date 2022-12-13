import { getInput, time } from "../utils";

type Packet = Packet[] | number;
const input = getInput("2022/13");
const start = performance.now();

let sum = 0;
const packets = input
	.split("\n\n")
	.map((i) => i.split("\n").map((text) => JSON.parse(text) as Packet)) as [
	Packet,
	Packet
][];
const compare = (...[left, right]: Packet[]): number => {
	if (typeof left === "number" && typeof right === "number")
		return left - right;
	if (typeof left === "number" && typeof right === "object")
		return compare([left], right);
	if (typeof left === "object" && typeof right === "number")
		return compare(left, [right]);
	if (typeof left === "object" && typeof right === "object") {
		for (let j = 0; j < left.length; j++) {
			const result = compare(left[j], right[j]);

			if (result) return result;
		}
		return compare(left.length, right.length);
	}
	return 0;
};

for (let i = 0; i < packets.length; i++)
	if (compare(...packets[i]) < 0) sum += i + 1;
const end = performance.now();

console.log(sum, time(start, end));
