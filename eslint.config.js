import * as emotion from "@emotion/eslint-plugin";
import * as typescript from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  {
    ignores: [
      "dist",
      "node_modules",
      "coverage",
      "*.config.js",
      "*.config.ts",
      "build",
      "tests-examples/**",
    ],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@emotion": emotion,
      prettier,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // TypeScript 기본 규칙
      ...typescript.configs["eslint-recommended"].rules,
      ...typescript.configs.recommended.rules,
      // JavaScript 관련 규칙
      "no-implicit-coercion": "error",
      "no-warning-comments": [
        "warn",
        {
          terms: ["TODO", "FIXME", "XXX", "BUG"],
          location: "anywhere",
        },
      ],
      curly: ["error", "all"],
      eqeqeq: ["error", "always", { null: "ignore" }],

      // TypeScript 관련 규칙
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-parameter-properties": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          selector: "variable",
          leadingUnderscore: "allow",
        },
        { format: ["camelCase", "PascalCase"], selector: "function" },
        { format: ["PascalCase"], selector: "interface" },
        { format: ["PascalCase"], selector: "typeAlias" },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true },
      ],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: [
            "public-static-field",
            "private-static-field",
            "public-instance-field",
            "private-instance-field",
            "public-constructor",
            "private-constructor",
            "public-instance-method",
            "private-instance-method",
          ],
        },
      ],

      // React 관련 규칙
      "react/prop-types": "off",
      "react/display-name": "off",
      "react-hooks/exhaustive-deps": "error",
      "react/react-in-jsx-scope": "off",
      "react/no-unknown-property": ["error", { ignore: ["css"] }],
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Emotion 관련 규칙
      "@emotion/pkg-renaming": "error",

      // 코드 스타일 관련 ESLint 규칙들을 비활성화
      "max-len": "off",
      "no-mixed-operators": "off",
      "no-tabs": "off",
      quotes: "off",
      "quote-props": "off",

      // import 순서 관련 규칙 비활성화
      "import/order": "off",

      // 더 엄격한 TypeScript 규칙
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { overrides: { constructors: "no-public" } },
      ],

      // React 최신 규칙
      "react/jsx-no-useless-fragment": "off",
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],

      // FSD 규칙들 제거
      "fsd/hoist-handler-hooks": "off",
      "fsd/no-layer-tight-coupling": "off",
      "fsd/public-api": "off",

      // 까다로운 규칙들 완화
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];
