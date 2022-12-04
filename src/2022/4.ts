import { readFileSync } from "node:fs";

const input = readFileSync("./inputs/2022/4", { encoding: "utf-8" });
///////////////////////////////////////////////////////////////////////////////

type Sections = [number, number];

const isIncluded1 = ([start1, end1]: Sections, [start2, end2]: Sections) =>
	start1 >= start2 && end1 <= end2;
const isIncluded2 = ([start1]: Sections, [start2, end2]: Sections) =>
	start1 >= start2 && start1 <= end2;
const rows = input
	.split("\n")
	.map(
		(r) =>
			r.split(",").map((s) => s.split("-").map((n) => Number(n))) as [
				Sections,
				Sections
			]
	);
let count1 = 0;
let count2 = 0;

for (const [section1, section2] of rows) {
	if (isIncluded1(section1, section2) || isIncluded1(section2, section1))
		count1++;
	if (isIncluded2(section1, section2) || isIncluded2(section2, section1))
		count2++;
}

console.log(count1, count2);
