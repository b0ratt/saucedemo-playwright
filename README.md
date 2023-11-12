# saucedemo-playwright

## :notebook_with_decorative_cover: Saucedemo app + Playwright example. :notebook_with_decorative_cover:
* TypeScript
* Page object pattern
* Divided E2E and visual tests
* GitHub Actions
* Playwright HTML reporter


## :hammer: How to run: :hammer:
1. Clone repository
2. Install packages with `npm install`
3. Start application with `npm run start`
4. Run playwright test
   - `npm e2e` (only e2e)
   - `npm visual` (only visual)
   - `npm all-tests` (everything)

Right now using basic playwright html reporter so test execution results will be stored in `./playwright-report/` directory

## :computer: GitHub Actions :computer:
You can run all tests using GitHub Actions using `workflow_dispatch` event trigger.
Currently 3 pipelines are available:
  - Run e2e tests
  - Run visual tests
  - Update snapshots

## :fire: Issues :fire:
If your PR is failing because of differences between snapshots and you want to update snapshots then just add `/update-snapshots` comment in your PR and it will automatically trigger `Update Snapshots` job and commit updated snapshots in your branch.