const variance = (values: number[]) => {
	const mean = values.reduce((a, b) => a + b, 0) / values.length;

	return (
		values.map((x) => (x - mean) ** 2).reduce((a, b) => a + b, 0) /
		values.length
	);
};
const modInverse = (a: number, m: number) => {
	let [m0, x0, x1] = [m, 0, 1];

	while (a > 1) {
		const q = Math.floor(a / m0);

		[m0, a] = [a % m0, m0];
		[x0, x1] = [x1 - q * x0, x0];
	}
	return x1 < 0 ? x1 + m : x1;
};
const regexp = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/gu;
const WIDTH = 101;
const HEIGHT = 103;

const secondPart = async (input: string) => {
	const robots: number[][] = [];

	for (const match of input.matchAll(regexp))
		robots.push(match.slice(1).map(Number));
	let bx = 0,
		by = 0;
	let mvx = Infinity,
		mvy = Infinity;
	for (let t = 0; t < HEIGHT; t++) {
		const dx = [],
			dy = [];

		for (const [x, y, vx, vy] of robots) {
			dx.push(Math.abs((x! + t * vx!) % WIDTH));
			dy.push(Math.abs((y! + t * vy!) % HEIGHT));
		}
		const cvx = variance(dx);
		const cvy = variance(dy);

		if (cvx < mvx) {
			mvx = cvx;
			bx = t;
		}
		if (cvy < mvy) {
			mvy = cvy;
			by = t;
		}
	}

	return bx + ((modInverse(WIDTH, HEIGHT) * (by - bx)) % HEIGHT) * WIDTH;
};

export default secondPart;
