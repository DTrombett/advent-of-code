type Position = [number, number, ...number[]];
type StrictPosition = [number, number];
enum Direction {
	Up,
	Right,
	Down,
	Left,
}

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
	startPosition: StrictPosition,
	obstacle: StrictPosition,
	lineLength: number,
) => {
	const tempObstacle = obstacle[1] * lineLength + obstacle[0];
	const position: [...StrictPosition, Direction] = [
		...startPosition,
		Direction.Up,
	];
	const visited: string[] = [];
	let nextPosition: string | undefined;

	visited.push(position.join());
	input = input.replace("^", ".");
	do {
		let nextIndex;

		while (
			(nextPosition =
				input[(nextIndex = resolvePos[position[2]](position, lineLength))]) ===
			"."
		) {
			if (nextIndex === tempObstacle) {
				nextPosition = "#";
				break;
			}
			updatePos[position[2]](position);
			const nextPos = position.join();

			if (visited.includes(nextPos)) return true;
			visited.push(nextPos);
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
	const startPosition: StrictPosition = [...position];
	const visited: string[] = [];
	let direction = Direction.Up;
	let nextPosition: string | undefined;
	let count = 0;

	input = input.replace("^", ".");
	visited.push(position.join());
	do {
		while (
			(nextPosition = input[resolvePos[direction](position, lineLength)]) ===
			"."
		) {
			updatePos[direction](position);
			const newPosition = position.join(",");

			if (!visited.includes(newPosition)) {
				if (checkLoop(input, startPosition, position, lineLength)) count++;
				visited.push(newPosition);
			}
		}
		if (direction === Direction.Left) direction = Direction.Up;
		else direction++;
	} while (nextPosition !== undefined && nextPosition !== "\n");
	return count;
};

export const iterations = 1;

export default secondPart;
