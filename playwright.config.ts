import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: process.env.CI
		? undefined
		: {
				command: 'npm run build && npm run preview',
				port: 4173
			},
	use: {
		baseURL: process.env.BASE_URL
	},
	testDir: 'tests',
	testMatch: /(.+\.)(test|spec)\.[jt]s/,
	reporter: [
		[
			'html',
			{
				open: 'never'
			}
		]
	]
};

export default config;
