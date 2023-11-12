import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: 'tests/tests',
	fullyParallel: true,
	reporter: [
		[
		  "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
		  {
			slackWebHookUrl: 'https://hooks.slack.com/services/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',
			sendResults: "always",
			showInThread: true,
			meta: [
				{
					key: 'Branch',
					value: process.env.BRANCH, // depending on your CI environment, this can be the branch name, build id, etc
				}
			],
		  },
		],
		['html', { open: 'never' }], // other reporters
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
