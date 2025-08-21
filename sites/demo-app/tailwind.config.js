const config = require('@myrepo/config-tailwind/tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui-components/src/**/*.{js,ts,jsx,tsx}',
  ],
};