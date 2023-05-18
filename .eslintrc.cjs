module.exports = {
  root: true,
  env: {
    node: true // 识别 nodejs 配置
  },
  extends: [
    // "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    'plugin:prettier/recommended',
    'plugin:vue/recommended'
  ],
  overrides: [],
  parser: "vue-eslint-parser",
  parserOptions: {
    extraFileExtensions: ['.vue'],
    parser: '@typescript-eslint/parser',
    project: resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "prettier/prettier": "error"
  },
};
