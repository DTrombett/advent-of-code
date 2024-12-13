const regexp =
	/Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/gu;

const secondPart = (input: string) => {
	let tokens = 0;

	for (const match of input.matchAll(regexp)) {
		const [, ax, ay, bx, by, ...xy] = match.map(Number);
		const [x, y] = xy.map((n) => n + 10_000_000_000_000);
		const b = (ax! * y! - ay! * x!) / (ax! * by! - ay! * bx!);
		const a = (x! - bx! * b) / ax!;

		if (b % 1 || a % 1) continue;
		tokens += a * 3 + b;
	}
	return tokens;
};

export default secondPart;
