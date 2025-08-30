const secondPart = (input: string) =>
	input
		.split("\n")
		.reduce(
			(sum, string) =>
				sum +
				2 +
				string.replaceAll("\\", String.raw`\\`).replaceAll('"', '\\"').length -
				string.length,
			0,
		);

export default secondPart;
