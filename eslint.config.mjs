import eslintConfigESLint from "eslint-config-eslint/cjs";

export default [
    ...eslintConfigESLint,
    {
        files: [
            "eslint.config.mjs",
        ],
        languageOptions: {
            sourceType: "module",
        }
    },
];
