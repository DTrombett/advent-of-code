const firstPart = (input: string) =>
	input.split("\n").reduce((sum, history) => {
		const sequence = history.split(" ") as unknown as number[];
		let needContinue: boolean;

		sum += parseInt(sequence.at(-1) as unknown as string, 10);
		do {
			needContinue = false;
			for (let j = 1; j < sequence.length; j++) {
				const lastIndex = j - 1;

				sequence[lastIndex] = sequence[j] - sequence[lastIndex];
				needContinue ||= sequence[lastIndex] !== 0;
			}
			sequence.length--;
			sum += sequence.at(-1)!;
		} while (needContinue);
		return sum;
	}, 0);

export default firstPart;
