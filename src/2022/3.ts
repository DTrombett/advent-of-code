import { getInput } from "../getInput";

const getPriority = (letter: string) => {
	const charCode =
		letter.toLowerCase().codePointAt(0)! - "a".codePointAt(0)! + 1;

	return letter === letter.toUpperCase() ? charCode + 26 : charCode;
};
const rucksacks = getInput("2022/3").split("\n");
const groups = 3;
let sum1 = 0,
	sum2 = 0;

for (const r of rucksacks) {
	const compartment = r.slice(r.length / 2);
	const letter = r
		.slice(0, r.length / 2)
		.split("")
		.find((c) => compartment.includes(c))!;

	sum1 += getPriority(letter);
}
for (let i = 0; i < rucksacks.length; i += groups) {
	const group: string[] = [];

	for (let j = 1; j < groups; j++) group.push(rucksacks[i + j]);
	const letter = rucksacks[i]
		.split("")
		.find((l) => group.every((g) => g.includes(l)))!;

	sum2 += getPriority(letter);
}

console.log(sum1, sum2);
