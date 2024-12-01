const splitter = /\s+/u;

const secondPart = (input: string) => {
	const array = input.split(splitter);
	const list: number[] = [];
	const map = new Map<number, number>();

	for (let i = 0; i < array.length; i++) {
		const n = parseInt(array[i]!, 10);

		if (i % 2) list.push(n);
		else map.set(n, (map.get(n) ?? 0) + 1);
	}
	return list.reduce((sum, n) => sum + n * (map.get(n) ?? 0), 0);
};

export default secondPart;
