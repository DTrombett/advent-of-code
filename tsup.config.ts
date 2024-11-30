import "dotenv/config";
import { env } from "node:process";
import { defineConfig } from "tsup";

const production = env.NODE_ENV === "production";

export default defineConfig({
	bundle: production,
	clean: true,
	entry: {
		index: production ? "src/index.ts" : "src/dev.ts",
	},
	external: production ? [] : undefined,
	format: "esm",
	minify: production,
	outDir: "dist",
	platform: "node",
	removeNodeProtocol: false,
	replaceNodeEnv: true,
	// silent: production,
	skipNodeModulesBundle: !production,
	sourcemap: !production,
	target: "esnext",
	// onSuccess,
	// watch,
});
