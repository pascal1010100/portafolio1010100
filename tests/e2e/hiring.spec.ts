import { expect, test } from "@playwright/test"

test("presenta un perfil profesional verificable y vías de contacto", async ({ page }) => {
  await page.goto("/hiring")

  await expect(
    page.getByRole("heading", { level: 1, name: "Product-focused full-stack developer." }),
  ).toBeVisible()
  await expect(page.getByText("Guatemala · Remote", { exact: true })).toBeVisible()
  await expect(page.getByText("Native Spanish · English B2", { exact: true })).toBeVisible()
  await expect(
    page.getByText("6 years of practical JavaScript and React development", { exact: true }),
  ).toBeVisible()
  await expect(page.getByText(/not six years of formal employment/i)).toBeVisible()

  await expect(page.getByRole("link", { name: "Request résumé" })).toHaveAttribute(
    "href",
    /^mailto:josemanu0885@gmail\.com\?subject=/,
  )
  await expect(page.getByRole("link", { name: "Review case studies" })).toHaveAttribute(
    "href",
    "/projects",
  )
  await expect(page.getByRole("link", { name: "GitHub", exact: true })).toHaveAttribute(
    "href",
    "https://github.com/pascal1010100",
  )
  await expect(page.getByRole("link", { name: "LinkedIn", exact: true })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/josema-aguilar-dev",
  )
})

test("integra Hiring como ruta secundaria y conserva el CTA comercial", async ({ page }) => {
  await page.goto("/")

  const primaryNavigation = page.getByRole("navigation", { name: "Primary navigation" })
  await expect(primaryNavigation.getByRole("link", { name: "Hiring" })).toHaveAttribute(
    "href",
    "/hiring",
  )
  await expect(
    primaryNavigation.getByRole("link", { name: "Discuss your project" }),
  ).toBeVisible()

  await primaryNavigation.getByRole("link", { name: "Hiring" }).click()
  await expect(page).toHaveURL(/\/hiring$/)
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Hiring" }),
  ).toHaveAttribute("aria-current", "page")
})

test("mantiene la ruta usable y sin overflow en móvil y tablet", async ({ page }) => {
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
  ]) {
    await page.setViewportSize(viewport)
    await page.goto("/hiring")

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    await expect(page.getByRole("link", { name: "Request résumé" })).toBeVisible()

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }))
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth)
  }
})

test("publica metadata canónica para la ruta de contratación", async ({ page }) => {
  await page.goto("/hiring")

  await expect(page).toHaveTitle("Hiring | Pascal.dev")
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/hiring$/)
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "profile")
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Six years of practical JavaScript and React experience/,
  )

  const sitemap = await page.request.get("/sitemap.xml")
  expect(await sitemap.text()).toContain("/hiring")
})
