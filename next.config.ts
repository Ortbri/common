import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	poweredByHeader: false,
	compress: true,
	images: {
		formats: ['image/avif', 'image/webp'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},
	headers: async () => [
		{
			source: '/:path*',
			headers: [
				{
					key: 'X-DNS-Prefetch-Control',
					value: 'on'
				},
				{
					key: 'Strict-Transport-Security',
					value: 'max-age=63072000; includeSubDomains; preload'
				},
				{
					key: 'X-XSS-Protection',
					value: '1; mode=block'
				},
				{
					key: 'X-Frame-Options',
					value: 'SAMEORIGIN'
				},
				{
					key: 'X-Content-Type-Options',
					value: 'nosniff'
				},
				{
					key: 'Referrer-Policy',
					value: 'origin-when-cross-origin'
				},
				{
					key: 'Permissions-Policy',
					value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
				}
			]
		}
	],
	// Enable experimental features (optional)
	experimental: {
		optimizeCss: true,      // Enable CSS optimization
		scrollRestoration: true, // Enable scroll restoration
		typedRoutes: true,      // Enable typed routes
	},
	// Webpack configuration for optimization
	webpack: (config) => {
		// Optimize packages with multiple versions
		config.optimization.moduleIds = 'deterministic';
		return config;
	},
};

// Analyze bundle size in production build
const withBundleAnalyzerWrapper = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzerWrapper(nextConfig);
