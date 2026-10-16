import { expect, test } from "@playwright/test"

const expectedEvidence = [
  {
    service: "Conversion Launch",
    cases: [
      {
        name: "Mandalas Hostal: Direct Cloudbeds booking journeys",
        href: "/projects/mandalas-hostal",
      },
      {
        name: "GuateRaw Travel: Live landing page with verified booking options",
        href: "/projects/guateraw-travel",
      },
    ],
  },
  {
    service: "Operations Flow",
    cases: [
      {
        name: "Not Your Money Laundry: Guided request-to-WhatsApp workflow",
        href: "/projects/not-your-money-laundry",
      },
      {
        name: "Mandalas Hostal: Read-only Cloudbeds operations integration",
        href: "/projects/mandalas-hostal",
      },
    ],
  },
  {
    service: "Product MVP",
    cases: [
      {
        name: "Nativa Market: Public ecommerce demo with cart and checkout",
        href: "/projects/nativa-market",
      },
      {
        name: "Open Narrative: Public SaaS editor with analysis and access flows",
        href: "/projects/open-narrative",
      },
    ],
  },
]

test("conecta cada servicio con casos relevantes y evidencia concreta", async ({ page }) => {
  await page.goto("/#services")

  const services = page.locator("#services")

  for (const expected of expectedEvidence) {
    const service = services.locator("article").filter({
      has: page.getByRole("heading", { name: expected.service, exact: true }),
    })

    await expect(service).toHaveCount(1)
    await expect(
      service.getByRole("list", { name: `${expected.service} relevant case studies` }),
    ).toBeVisible()

    for (const caseStudy of expected.cases) {
      await expect(service.getByRole("link", { name: caseStudy.name })).toHaveAttribute(
        "href",
        caseStudy.href,
      )
    }
  }
})

test("mantiene la evidencia usable y sin overflow en móvil", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 })
  await page.goto("/#services")

  const evidenceLinks = page.locator("#services").getByRole("link", {
    name: /Cloudbeds|booking options|WhatsApp workflow|ecommerce demo|SaaS editor/,
  })

  await expect(evidenceLinks).toHaveCount(6)

  for (const link of await evidenceLinks.all()) {
    const box = await link.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.height).toBeGreaterThanOrEqual(44)
  }

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }))
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth)
})
