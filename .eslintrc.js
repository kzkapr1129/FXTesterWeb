module.exports = {
  extends: ["eslint:recommended", "plugin:prettier/recommended", 'plugin:react/recommended', "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  plugins: ["@typescript-eslint", 'prettier', 'import'],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.json",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  ignorePatterns: [
    "**/*.js",
  ],
  settings: {
    react: {
        version: 'detect',
    },
  },
  rules: {
    "no-console": "off",
    "@typescript-eslint/adjacent-overload-signatures": "warn",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "react/display-name": "off",
    "react/prop-types": "off",
    "react-hooks/exhaustive-deps": "warn",
    "sort-imports": [
			"error",
			{ "ignoreCase": true, "ignoreDeclarationSort": true }
		],
		"import/order": [
			"error",
			{
				"groups": [
					 "builtin",
					"external",
					"internal",
					["sibling", "parent"],
					"object"
				],
				"pathGroups": [
					{
						"pattern": "react",
						"group": "builtin",
						"position": "before"
					},
					{
						"pattern": ".*/UI/**",
						"group": "internal",
						"position": "before"
					},
					{
						"pattern": "./*.module.css",
						"group": "index",
						"position": "after"
					}
				],
				"newlines-between": "always",
				"alphabetize": {
					"order": "asc",
					"caseInsensitive": true
				}
			}
		]
  }
}