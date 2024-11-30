const firstPart = (input: string) =>
	input.split("\n").reduce((sum, history) => {
		const sequence = history.split(" ") as unknown as number[];
		let needContinue: boolean;
		let first = parseInt(sequence[0] as unknown as string, 10);
		let add = false as boolean;

		do {
			needContinue = false;
			for (let j = 1; j < sequence.length; j++) {
				const lastIndex = j - 1;

				sequence[lastIndex] = sequence[j] - sequence[lastIndex];
				needContinue ||= sequence[lastIndex] !== 0;
			}
			sequence.length--;
			if ((add = !add)) first -= sequence[0];
			else first += sequence[0];
		} while (needContinue);
		return sum + first;
	}, 0);

export default firstPart;
