import type { NextConfig } from 'next';
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const { FederatedTypesPlugin } = require('@module-federation/typescript');
const dependencies = require('./package.json').dependencies;

const nextConfig: NextConfig = {
	reactStrictMode: true,

	webpack(config) {
		const federationConfig = {
			name: 'remote1',
			filename: 'static/chunks/remoteEntry.js',
			dts: false,
			exposes: {
				'./simple-page': './src/pages/simple-page/index.tsx',
				'./complex-page': './src/pages/complex-page/index.tsx',
			},
			extraOptions: {
				exposePages: true,
			},
			dependencies,
		};

		config.plugins.push(new NextFederationPlugin(federationConfig));

		config.plugins.push(
			new FederatedTypesPlugin({
				federationConfig,
			})
		);

		return config;
	},
};

export default nextConfig;
