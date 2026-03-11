module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    "react-app",
    "react-app/jest",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "import/no-anonymous-default-export": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".js", ".jsx"] }],
    "import/prefer-default-export": "off",
    "prettier/prettier": "error",
    "no-unused-vars": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
