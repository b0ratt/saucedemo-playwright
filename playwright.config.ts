import { defineConfig, devices } from '@playwright/test';

require('dotenv').config();

export default defineConfig({
	testDir: 'tests/tests',
	fullyParallel: true,
	reporter: [
		[
		  "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
		  {
			slackWebHookUrl: process.env.SLACK_WEBHOOK,
			sendResults: "always",
			showInThread: true,
			meta: [
				{
					key: 'Branch',
					value: process.env.BRANCH_NAME,
				}
			],
		  },
		],
		['html', { open: 'never' }],
	  ],
	use: {
		baseURL: 'http://localhost:3000',
		testIdAttribute: 'data-testid',
		trace: 'on-first-retry',
		viewport: { width: 1920, height: 1080 },
		screenshot: 'only-on-failure',
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   url: 'http://127.0.0.1:3000',
	//   reuseExistingServer: !process.env.CI,
	// },
});
