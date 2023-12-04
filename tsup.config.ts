import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	clean: true,
	bundle: false,
	external: [],
	format: "esm",
	minify: "terser",
	outDir: "dist",
	replaceNodeEnv: true,
	silent: true,
	skipNodeModulesBundle: false,
	target: "esnext",
});
