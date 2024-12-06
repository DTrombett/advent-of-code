enum Direction {
	Up,
	Right,
	Down,
	Left,
}

const resolvePos: Record<
	Direction,
	(position: [number, number], lineLength: number) => number
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
const updatePos: Record<Direction, (position: [number, number]) => number> = {
	[Direction.Up]: (position) => position[1]--,
	[Direction.Right]: (position) => position[0]++,
	[Direction.Down]: (position) => position[1]++,
	[Direction.Left]: (position) => position[0]--,
};

const firstPart = (input: string) => {
	const lineLength = input.indexOf("\n") + 1;
	const index = input.indexOf("^");
	const position: [number, number] = [
		index % lineLength,
		Math.floor(index / lineLength),
	];
	const visited = new Set<string>();
	let direction = Direction.Up;
	let nextPosition: string | undefined;

	visited.add(position.join());
	input = input.replace("^", ".");
	do {
		while (
			(nextPosition = input[resolvePos[direction](position, lineLength)]) ===
			"."
		) {
			updatePos[direction](position);
			visited.add(position.join());
		}
		if (direction === Direction.Left) direction = Direction.Up;
		else direction++;
	} while (nextPosition !== undefined && nextPosition !== "\n");
	return visited.size;
};

export default firstPart;
