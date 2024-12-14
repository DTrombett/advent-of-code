const regexp = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/gu;
const SECONDS = 100;
const WIDTH = 101;
const HEIGHT = 103;
const MIDDLE_X = Math.floor(WIDTH / 2);
const MIDDLE_Y = Math.floor(HEIGHT / 2);

const firstPart = (input: string) => {
	const quadrants: [[number, number], [number, number]] = [
		[0, 0],
		[0, 0],
	];

	for (const match of input.matchAll(regexp)) {
		const [, px, py, vx, vy] = match.map(Number);
		const dx = (px! + vx! * SECONDS) % WIDTH;
		const dy = (py! + vy! * SECONDS) % HEIGHT;
		const newX = dx >= 0 ? dx : WIDTH + dx;
		const newY = dy >= 0 ? dy : HEIGHT + dy;
		let x: 0 | 1 = 0,
			y: 0 | 1 = 0;

		if (newX > MIDDLE_X) x = 1;
		else if (newX === MIDDLE_X) continue;
		if (newY > MIDDLE_Y) y = 1;
		else if (newY === MIDDLE_Y) continue;
		quadrants[x][y]++;
	}
	return quadrants.flat().reduce((a, b) => a * b);
};

export default firstPart;
