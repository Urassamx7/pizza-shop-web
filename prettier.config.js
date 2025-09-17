/* eslint-disable @stylistic/max-len */
// prettier.config.js

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  plugins: ['prettier-plugin-tailwindcss'],
  singleQuote: true,
  tailwindStylesheet: './src/index.css',
}
