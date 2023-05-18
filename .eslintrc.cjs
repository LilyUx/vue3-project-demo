module.exports = {
  root: true,
  env: {
    node: true, // 识别 nodejs 配置
  },
  extends: [
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:vue/recommended",
    "eslint:recommended",
    "plugin:vue/base",
    "plugin:vue/vue3-recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    extraFileExtensions: [".vue"],
    parser: "@typescript-eslint/parser",
    ecmaVersion: 12,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["tsconfig.json"],
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "prettier/prettier": "error",
    "vue/multi-word-component-names": "off",
    "vue/max-attributes-per-line": "off",
    "vue/html-closing-bracket-newline": "off",
    "vue/singleline-html-element-content-newline": "off",
    "@typescript-eslint/no-explicit-any": ["off"],
    "no-unused-vars": "off",
  },
};
