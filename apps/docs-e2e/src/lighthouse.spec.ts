// TODO: Investigate node global process usage
import type { Browser } from 'playwright'
import { chromium, test } from '@playwright/test'
import getPort from 'get-port'
import { playAudit } from 'playwright-lighthouse'

const lighthouseTest = test.extend<{ Page }, { port: number, browser: Browser }>({
  port: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      // Assign a unique port for each playwright worker to support parallel tests
      const port = await getPort()
      await use(port)
    },
    { scope: 'worker' },
  ],

  browser: [
    async ({ port }, use) => {
      const browser = await chromium.launch({
        args: [`--remote-debugging-port=${port}`],
      })
      await use(browser)
    },
    { scope: 'worker' },
  ],
})

const thresholdsConfig = {
  'performance': 90,
  'accessibility': 90,
  'best-practices': 90,
  'seo': 90,
  // 'pwa': 50,
}

lighthouseTest('should pass lighthouse audits', async ({ page, port }) => {
  // Skip Lighthouse tests for specific projects
  const testInfo = test.info().project.name
  if (
    ['firefox (desktop)', 'webkit (desktop)', 'webkit (tablet)', 'webkit (mobile)'].includes(
      testInfo,
    )
    || process.env.CI) {
    test.skip('Lighthouse is not supported for this project')
  }

  await page.goto('/')

  await playAudit({
    page,
    port,
    thresholds: thresholdsConfig,
    reports: {
      formats: {
        // json: true, // defaults to false
        html: true, // defaults to false
        // csv: true, // defaults to false
      },
      name: `latest-report`, // defaults to `lighthouse-${new Date().getTime()}`
      directory: `${process.cwd()}../../../lighthouse-report`, // defaults to `${process.cwd()}/lighthouse`
    },
  })
})
