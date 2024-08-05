/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */
/** @typedef {import("prettier").Config} PrettierConfig */
/**
 * Remember to restart VSCode after making
 * any changes here and saving this file.
 */

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
/** @type {PrettierConfig | { sortImports: SortImportsConfig }} */
const config = {
	arrowParens: "always",
	quoteProps: "preserve",
	bracketSameLine: false,
	endOfLine: "lf",
	importOrder: [
		"^~/styles/(.*)$",
		"",
		"^(react/(.*)$)|^(react$)",
		"^(next/(.*)$)|^(next$)",
		"<THIRD_PARTY_MODULES>",
		"",
		"^~/app",
		"^~/app/(.*)$",
		"^~/data/(.*)$",
		"^~/providers/(.*)$",
		"^~/hooks/(.*)$",
		"^~/components/(.*)$",
		"^~/utils/(.*)$",
		"",
		"^[./]",
		"",
	],
	importOrderParserPlugins: ["javascript", "jsx", "decorators-legacy"],
	plugins: [
		"prettier-plugin-tailwindcss",
		"prettier-plugin-packagejson",
		"@ianvs/prettier-plugin-sort-imports",
	],
	printWidth: 120,
	semi: true,
	singleQuote: false,
	tabWidth: 2,
	trailingComma: "all",
	useTabs: false,
};

export default config;
