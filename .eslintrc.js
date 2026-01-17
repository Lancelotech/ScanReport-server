module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json", "./tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "/generated/**/*", // Ignore generated files.
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    "quotes": ["error", "double"],
    "import/no-unresolved": 0,
    "indent": ["error", 2],

    // 👇 не заставляем писать JSDoc на каждую функцию
    "require-jsdoc": "off",

    // 👇 не душим за длину строки
    "max-len": "off",

    // 👇 разрешаем пробелы внутри фигурных (мне так тоже приятнее)
    "object-curly-spacing": ["error", "always"],

    // 👇 чтобы не ругался на declare global namespace Express
    "@typescript-eslint/no-namespace": "off",
    "new-cap": ["error", {
      capIsNew: false,
    }],
  },
};
