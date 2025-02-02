import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js"; // ESLint's recommended rules

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // ESLint's recommended rules
  js.configs.recommended,

  // Next.js configurations
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // TypeScript ESLint plugin
  ...compat.extends("plugin:@typescript-eslint/recommended"),

  // Custom rules
  {
    rules: {
      "no-console": "warn", // Warn on console.log
      "react/prop-types": "off", // Disable prop-types for TypeScript projects
      "@typescript-eslint/no-unused-vars": "warn", // Warn on unused variables
    },
  },
];

export default eslintConfig;