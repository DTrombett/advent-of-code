type Position = [number, number, ...number[]];
type StrictPosition = [number, number];
enum Direction {
	Up,
	Right,
	Down,
	Left,
}

const resolveIndex = (position: Position, lineLength: number) =>
	position[0] + position[1] * lineLength;
const resolvePos: Record<
	Direction,
	(position: Position, lineLength: number) => number
> = {
	[Direction.Down]: (position, lineLength) =>
		(position[1] + 1) * lineLength + position[0],
	[Direction.Up]: (position, lineLength) =>
		(position[1] - 1) * lineLength + position[0],
	[Direction.Left]: (position, lineLength) =>
		position[1] * lineLength + position[0] - 1,
	[Direction.Right]: (position, lineLength) =>
		position[1] * lineLength + position[0] + 1,
};
const updatePos: Record<Direction, (position: Position) => number> = {
	[Direction.Up]: (position) => position[1]--,
	[Direction.Right]: (position) => position[0]++,
	[Direction.Down]: (position) => position[1]++,
	[Direction.Left]: (position) => position[0]--,
};
const checkLoop = (
	input: string,
	position: [...StrictPosition, Direction],
	obstacle: number,
	lineLength: number,
	history: string[],
) => {
	let nextPosition: string | undefined;

	history = history.slice();
	do {
		let nextIndex;

		while (
			(nextPosition =
				input[(nextIndex = resolvePos[position[2]](position, lineLength))]) ===
				"." &&
			nextIndex !== obstacle
		) {
			updatePos[position[2]](position);
			const nextPos = position.join();

			if (history.includes(nextPos)) return true;
			history.push(nextPos);
		}
		if (position[2] === Direction.Left) position[2] = Direction.Up;
		else position[2]++;
	} while (nextPosition !== undefined && nextPosition !== "\n");
	return false;
};

const secondPart = (input: string) => {
	const lineLength = input.indexOf("\n") + 1;
	const index = input.indexOf("^");
	const position: StrictPosition = [
		index % lineLength,
		Math.floor(index / lineLength),
	];
	const visited: number[] = [];
	const history: string[] = [];
	let direction = Direction.Up;
	let nextPosition: string | undefined;
	let count = 0;

	input = input.replace("^", ".");
	visited.push(resolveIndex(position, lineLength));
	do {
		while (
			(nextPosition = input[resolvePos[direction](position, lineLength)]) ===
			"."
		) {
			const startPosition: [number, number, Direction] = [
				position[0],
				position[1],
				direction,
			];

			history.push(startPosition.join());
			updatePos[direction](position);
			const obstacle = resolveIndex(position, lineLength);

			if (!visited.includes(obstacle)) {
				if (checkLoop(input, startPosition, obstacle, lineLength, history))
					count++;
				visited.push(obstacle);
			}
		}
		if (direction === Direction.Left) direction = Direction.Up;
		else direction++;
	} while (nextPosition !== undefined && nextPosition !== "\n");
	return count;
};

export const iterations = 1;

export default secondPart;
