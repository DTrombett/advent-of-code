import "dotenv/config";
import { env } from "node:process";
import { defineConfig } from "tsup";

const production = env.NODE_ENV === "production";

export default defineConfig({
	bundle: false,
	clean: true,
	entry: ["src/index.ts"],
	format: "esm",
	minify: production,
	outDir: "dist",
	platform: "node",
	removeNodeProtocol: false,
	replaceNodeEnv: true,
	silent: production,
	sourcemap: !production,
	target: "esnext",
});
