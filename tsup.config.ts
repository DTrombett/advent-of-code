import "dotenv/config";
import { env } from "node:process";
import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	clean: true,
	bundle: false,
	external: [],
	format: "esm",
	minify: env.NODE_ENV === "production" ? "terser" : false,
	outDir: "dist",
	replaceNodeEnv: true,
	silent: true,
	skipNodeModulesBundle: false,
	target: "esnext",
	sourcemap: env.NODE_ENV === "production" ? false : "inline",
});
