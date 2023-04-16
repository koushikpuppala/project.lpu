/** @type {import('prettier').Config} */

module.exports = {
	...require('../.prettierrc.js'),
	plugins: [require('prettier-plugin-tailwindcss')],
}
