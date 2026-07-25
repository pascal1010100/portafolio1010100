import { defineConfig, devices } from "@playwright/test"

const testPort = Number(process.env.PLAYWRIGHT_PORT ?? 3107)
const testUrl = `http://127.0.0.1:${testPort}`

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: testUrl,
    contextOptions: { reducedMotion: "reduce" },
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `pnpm exec next start -p ${testPort}`,
    url: testUrl,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
