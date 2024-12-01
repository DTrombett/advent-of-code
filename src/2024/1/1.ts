const splitter = /\s+/u;

const firstPart = (input: string) => {
	const array = input.split(splitter);
	const lists: [number[], number[]] = [[], []];

	for (let i = 0; i < array.length; i++)
		lists[i % 2]!.push(parseInt(array[i]!, 10));
	for (const list of lists) list.sort((a, b) => a - b);
	return lists[0].reduce((sum, n, i) => sum + Math.abs(n - lists[1][i]!), 0);
};

export default firstPart;
