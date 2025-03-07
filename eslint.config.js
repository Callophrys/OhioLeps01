import svelte from "eslint-plugin-svelte";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";

export default [
  // Svelte rules
  {
    files: ["**/*.svelte"],
    plugins: { svelte },
    languageOptions: {
      parser: svelte.parsers.svelte,
    },
    rules: {
      ...svelte.configs.recommended.rules,
      "svelte/indent": ["error", 2], // ✅ Ensure 2-space indentation in <script> and <style>
    },
  },

  // TypeScript & JavaScript rules
  {
    files: ["**/*.ts", "**/*.js"],
    plugins: { ts },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        project: "./tsconfig.json", // ✅ Ensure TypeScript gets project context
      },
    },
    rules: {
      ...ts.configs.recommended.rules,
      indent: ["error", 2], // ✅ Enforce 2-space indentation for JS/TS
    },
  },

  // Styles (CSS, LESS, SASS, SCSS, Svelte styles)
  {
    files: ["**/*.css", "**/*.less", "**/*.sass", "**/*.scss", "**/*.svelte"],
    rules: {
      indent: ["error", 2], // ✅ Ensure 2-space indentation in styles
    },
  },

  // Prettier integration
  {
    files: ["**/*.{js,ts,svelte,json}"],
    plugins: { prettier },
    extends: ["prettier"], // Ensure prettier rules override ESLint
    rules: {
      "prettier/prettier": [
        "error",
        {
          printWidth: 114, // Line length before wrapping
          proseWrap: "preserve", // Keep manual line breaks
          arrowParens: "always",
          trailingComma: "none",
          tabWidth: 2, // ✅ Enforce 2-space indentation
          useTabs: false, // Set to true if you prefer tabs
          svelteBracketNewLine: false, // Prevents newline before the closing `>`
          htmlWhitespaceSensitivity: "ignore", // ✅ Preserve whitespace in HTML/Svelte
        },
      ],
    },
  },

  // Ignore unnecessary files
  {
    ignores: [
      "**/*.min.css",
      "**/*.min.js",
      "*.config.cjs",
      "*.config.json",
      ".DS_Store",
      ".env",
      ".env.*",
      ".svelte-kit/",
      "build/",
      "node_modules/",
      "package/",

      // Ignore lock files
      "pnpm-lock.yaml",
      "package-lock.json",
      "yarn.lock",

      // Ignore miscellaneous files
      "*.md",
      "useful-sql.sql",
    ],
  },
];
