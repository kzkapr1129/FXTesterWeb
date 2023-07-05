module.exports = {
  extends: ["eslint:recommended", "plugin:prettier/recommended", 'plugin:react/recommended', "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  plugins: ["@typescript-eslint", 'prettier'],
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
    "no-console": "warn",
    "@typescript-eslint/adjacent-overload-signatures": "warn",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "react/display-name": "off",
    "react/prop-types": "off",
    "react-hooks/exhaustive-deps": "warn"
  }
}