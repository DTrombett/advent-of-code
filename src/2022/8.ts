import { getInput, time } from "../utils";

const input = getInput("2022/8");
const start = performance.now();

const rows = input.split("\n").map((r) => r.split("").map((n) => Number(n)));
let score = 0,
	tmpScore = 0;
const increaseScore = (current: number, i: number, j: number) => {
	tmpScore++;
	if (current >= rows[i][j]) return true;
	return false;
};
const updateLocal = (localScore: number) => {
	localScore *= tmpScore;
	tmpScore = 0;
	return localScore;
};

for (let i = 0; i < rows.length; i++)
	for (let j = 0; j < rows[i].length; j++) {
		if (i === 0 || j === 0 || i === rows.length - 1 || j === rows[i].length - 1)
			continue;
		if (rows[i][j] === 0) {
			if (score < 4) score = 4;
			continue;
		}
		let localScore = 1;

		for (let r = i - 1; r >= 0; r--) if (increaseScore(rows[r][j], i, j)) break;
		localScore = updateLocal(localScore);
		for (let r = i + 1; r < rows.length; r++)
			if (increaseScore(rows[r][j], i, j)) break;
		localScore = updateLocal(localScore);
		for (let r = j - 1; r >= 0; r--) if (increaseScore(rows[i][r], i, j)) break;
		localScore = updateLocal(localScore);
		for (let r = j + 1; r < rows[i].length; r++)
			if (increaseScore(rows[i][r], i, j)) break;
		localScore = updateLocal(localScore);
		if (score < localScore) score = localScore;
	}
const end = performance.now();

console.log(score, time(start, end));
