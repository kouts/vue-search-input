/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    es2021: true,
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    'plugin:prettier-vue/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2021
  },
  plugins: ['html'],
  ignorePatterns: ['**/node_modules/**', '{tmp,temp}/**', '**/*.min.js', 'vendor/**', 'dist/**', 'public/**'],
  overrides: [
    {
      files: ['*.json'],
      rules: {
        quotes: [2, 'double']
      }
    },
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    },
    {
      files: ['**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ],
  rules: {
    // Console and debugger settings depending whether we're on production or not
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'

    // 'vue/no-export-in-script-setup': 'off',

    // '@typescript-eslint/no-unused-vars': 'off',
    // 'no-unused-vars': 'off'
  }
}
