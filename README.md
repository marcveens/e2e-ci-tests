# E2E CI tests 
![Travis CI](https://travis-ci.com/marcveens/e2e-ci-tests.svg?branch=master)

## How it works
This repo makes it possible to run end-to-end tests on a build agent using your create-react-app localhost development environment. 

- e2e tests can be run either headful(?) and headless
- In case the `npm run tests-e2e-ci` command runs on a build agent:
    1. Node runs the `npm run ci-start` command (same as `npm start` but without opening an actual browser)
    2. Node waits for port 3000 to become available. This means that the React app is running. 
    3. `npm run test-e2e-ci-exec` will run and use localhost:3000 for the e2e tests
    4. When a test fails, the build will also fail
    5. No matter what the result is, all started processes will be killed gracefully.

## Used packages for e2e testing
| Package | Description |
|-|-|
| [`jest`](https://www.npmjs.com/package/jest) | JavaScript testing framework |
| [`puppeteer`](https://www.npmjs.com/package/puppeteer) | Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run full (non-headless) Chrome or Chromium. |
| [`jest-puppeteer`](https://www.npmjs.com/package/jest-puppeteer) | Jest preset containing all required configuration for writing integration tests using Puppeteer. |

## Important npm commands
| Command | Description |
|-|-|
| `test-e2e` | Runs E2E tests in non-headless mode, thus it opens a browser for you. |
| `test-e2e-ci` | Runs E2E tests in a headless browser + runs `npm start` beforehand. |
| `test-e2e-ci-exec` | Runs E2E tests in a headless browser. Requires you to run `npm start` beforehand. |