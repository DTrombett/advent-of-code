const regexp =
	/Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/gu;

const firstPart = (input: string) => {
	let tokens = 0;

	for (const match of input.matchAll(regexp)) {
		const [, ax, ay, bx, by, x, y] = match.map(Number);
		const b = (ax! * y! - ay! * x!) / (ax! * by! - ay! * bx!);
		const a = (x! - bx! * b) / ax!;

		if (b % 1 || a % 1) continue;
		tokens += a * 3 + b;
	}
	return tokens;
};

export default firstPart;
