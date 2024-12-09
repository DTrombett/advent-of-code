const firstPart = (input: string) => {
	let block = 0;
	let result = 0;
	const blocks: (string | number)[] = input.split("");

	for (let i = 0; i < blocks.length; i++) {
		let count = Number(blocks[i]);

		if (i % 2)
			for (; count > 0; count--) {
				let last;

				while (!(last = Number(blocks.at(-1))))
					blocks.splice(blocks.length - 2);
				const lastIndex = blocks.length - 1;

				blocks[lastIndex] = last - 1;
				result += block++ * (lastIndex / 2);
			}
		else {
			const id = i / 2;

			for (; count > 0; count--) result += block++ * id;
		}
	}
	return result;
};

export default firstPart;
