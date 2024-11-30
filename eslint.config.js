import eslint from "@eslint/js";
import nodePlugin from "eslint-plugin-n";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
	eslint.configs.all,
	nodePlugin.configs["flat/recommended"],
	...tsEslint.configs.all,
	{
		ignores: ["dist", "node_modules"],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			"@typescript-eslint/class-methods-use-this": "off",
			"@typescript-eslint/consistent-return": "off",
			"@typescript-eslint/consistent-type-definitions": ["error", "type"],
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/explicit-member-accessibility": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/init-declarations": "off",
			"@typescript-eslint/max-params": "off",
			"@typescript-eslint/naming-convention": "off",
			"@typescript-eslint/no-confusing-non-null-assertion": "off",
			"@typescript-eslint/no-deprecated": "off",
			"@typescript-eslint/no-dynamic-delete": "off",
			"@typescript-eslint/no-empty-function": "off",
			"@typescript-eslint/no-invalid-void-type": "off",
			"@typescript-eslint/no-magic-numbers": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/no-unnecessary-type-parameters": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-enum-comparison": "off",
			"@typescript-eslint/no-unsafe-function-type": "off",
			"@typescript-eslint/no-unsafe-type-assertion": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/parameter-properties": "off",
			"@typescript-eslint/prefer-enum-initializers": "off",
			"@typescript-eslint/prefer-readonly-parameter-types": "off",
			"@typescript-eslint/promise-function-async": "off",
			"@typescript-eslint/require-await": "off",
			"@typescript-eslint/strict-boolean-expressions": "off",
			"@typescript-eslint/use-unknown-in-catch-callback-variable": "off",
			camelcase: "off",
			"capitalized-comments": "off",
			complexity: "off",
			curly: ["error", "multi"],
			eqeqeq: ["error", "always", { null: "ignore" }],
			"id-length": "off",
			"max-classes-per-file": "off",
			"max-depth": "off",
			"max-lines-per-function": "off",
			"max-lines": "off",
			"max-statements": "off",
			"n/file-extension-in-import": "off",
			"n/no-missing-import": "off",
			"n/prefer-global/buffer": ["error", "never"],
			"n/prefer-global/console": ["error", "never"],
			"n/prefer-global/process": ["error", "never"],
			"n/prefer-global/text-decoder": ["error", "never"],
			"n/prefer-global/text-encoder": ["error", "never"],
			"n/prefer-global/url-search-params": ["error", "never"],
			"n/prefer-node-protocol": "error",
			"n/prefer-promises/dns": "error",
			"n/prefer-promises/fs": "error",
			"no-await-in-loop": "off",
			"no-bitwise": "off",
			"no-console": "off",
			"no-continue": "off",
			"no-duplicate-imports": "off",
			"no-eq-null": "off",
			"no-multi-assign": "off",
			"no-nested-ternary": "off",
			"no-param-reassign": "off",
			"no-plusplus": "off",
			"no-ternary": "off",
			"no-undefined": "off",
			"no-underscore-dangle": "off",
			"no-void": "off",
			"no-warning-comments": "warn",
			"one-var": "off",
			"prefer-named-capture-group": "off",
			"require-atomic-updates": "off",
			"sort-imports": "off",
			"sort-keys": "off",
		},
	},
);