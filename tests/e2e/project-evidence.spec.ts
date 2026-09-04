import { expect, test } from "@playwright/test"

test("distinguishes public evidence from private records and names the supported claim", async ({ page }) => {
  await page.goto("/projects/nativa-market")

  const evidence = page.getByRole("complementary", { name: "Project details" })
  await expect(evidence.getByRole("heading", { name: "Evidence links and records" })).toBeVisible()
  await expect(evidence.getByText(/Public items open their source/)).toBeVisible()

  const publicItem = evidence.getByRole("listitem").filter({
    hasText: "Production store and catalogue on its own domain",
  })
  await expect(publicItem.getByRole("link")).toHaveAttribute("href", "https://www.nativamarket.net/")
  await expect(publicItem.getByText("Public product", { exact: true })).toBeVisible()
  await expect(publicItem.getByText(/Supports: The ecommerce storefront/)).toBeVisible()

  const privateItem = evidence.getByRole("listitem").filter({
    hasText: "Transactional checkout and admin dashboard",
  })
  await expect(privateItem.getByText("Private evidence", { exact: true })).toBeVisible()
  await expect(privateItem.getByRole("link")).toHaveCount(0)
  await expect(privateItem.getByText(/Supports: The implementation includes transactional ordering/)).toBeVisible()
})

test("exposes prudent case-study, application, and breadcrumb structured data", async ({ page }) => {
  await page.goto("/projects/mandalas-hostal")

  const structuredData = await page.locator("#project-json-ld").textContent()
  expect(structuredData).not.toBeNull()

  const jsonLd = JSON.parse(structuredData!)
  expect(jsonLd["@context"]).toBe("https://schema.org")

  const caseStudy = jsonLd["@graph"].find((entry: { "@type": string }) => entry["@type"] === "CreativeWork")
  expect(caseStudy).toMatchObject({
    name: "Mandalas Hostal case study",
    genre: "Software case study",
    dateModified: "2026-07-14",
    about: {
      "@type": "SoftwareApplication",
      name: "Mandalas Hostal",
      operatingSystem: "Web",
      url: "https://www.mandalashostels.com/",
    },
  })
  expect(caseStudy).not.toHaveProperty("aggregateRating")
  expect(caseStudy).not.toHaveProperty("offers")

  const breadcrumbs = jsonLd["@graph"].find((entry: { "@type": string }) => entry["@type"] === "BreadcrumbList")
  expect(breadcrumbs.itemListElement.map((item: { name: string }) => item.name)).toEqual([
    "Home",
    "Projects",
    "Mandalas Hostal",
  ])

  await expect(
    page.getByRole("img", {
      name: "Mandalas Hostal website introducing its two Lake Atitlán properties",
    }),
  ).toBeVisible()
})

