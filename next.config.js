/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')

const nextConfig = withPWA({
	dest: 'public',
	register: true,
	disable: process.env.NODE_ENV === 'production' ? false : true,
})({
	images: {
		domains: ['lh3.googleusercontent.com'],
	},
})

module.exports = nextConfig
