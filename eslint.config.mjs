import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import astro from "eslint-plugin-astro";

export default tseslint.config(
  {
    // `public/` holds passthrough assets — the PHP API and its composer vendor
    // tree, plus the favicon set. `dist/` and `.astro/` are build output.
    ignores: ["dist/", ".astro/", "public/", "node_modules/", "coverage/"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    // TypeScript resolves identifiers itself, including Astro's ambient globals
    // (ImageMetadata, Astro). ESLint's no-undef only produces false positives.
    files: ["src/**/*.{ts,tsx,astro}"],
    rules: { "no-undef": "off" },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    // Astro components define props via a local `Props` interface that is read
    // by the compiler rather than referenced in the frontmatter body.
    files: ["src/**/*.astro"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
);
