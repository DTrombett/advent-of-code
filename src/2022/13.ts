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
	const tLeft = typeof left,
		tRight = typeof right;

	if (tLeft === "number" && tRight === "number")
		return Number(left > right) - Number(left < right);
	if (tLeft === "number" && tRight === "object") return compare([left], right);
	if (tLeft === "object" && tRight === "number") return compare(left, [right]);
	if (Array.isArray(left) && Array.isArray(right)) {
		for (let j = 0; j < left.length; j++) {
			const result = compare(left[j], right[j]);

			if (result) return result;
		}
		return compare(left.length, right.length);
	}
	return 0;
};

for (let i = 0; i < packets.length; i++)
	if (compare(...packets[i]) === -1) sum += i + 1;
const end = performance.now();

console.log(sum, time(start, end));
