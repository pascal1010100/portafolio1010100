import { expect, test } from "@playwright/test"

test("permite buscar y abrir un proyecto", async ({ page }) => {
  await page.goto("/projects")

  await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible()
  await page.getByPlaceholder("Search projects...").fill("Open Narrative")
  await expect(page.getByRole("heading", { level: 2, name: "Open Narrative" })).toBeVisible()
  await expect(page.getByRole("heading", { level: 2, name: "Nativa Market" })).toHaveCount(0)

  await page.getByRole("heading", { name: "Open Narrative" }).click()
  await expect(page).toHaveURL(/\/projects\/open-narrative$/)
  await expect(page.getByRole("heading", { level: 1, name: "Open Narrative" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Evidence links" })).toBeVisible()
})

test("responde con 404 para un proyecto inexistente", async ({ page }) => {
  const response = await page.goto("/projects/caso-inexistente")

  expect(response?.status()).toBe(404)
  await expect(
    page.getByRole("heading", { name: "This coordinate fell outside the map." }),
  ).toBeVisible()
  await expect(page.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/")
  await expect(page.getByRole("link", { name: "View projects" })).toHaveAttribute(
    "href",
    "/projects",
  )
})

test("expone nombres accesibles para buscar y abrir recursos", async ({ page }) => {
  await page.goto("/projects")

  await expect(page.getByRole("textbox", { name: "Search projects" })).toBeVisible()

  const firstProject = page.locator("[class*='group']").filter({
    has: page.getByRole("heading", { name: "Mandalas Hostal" }),
  }).first()

  await expect(
    firstProject.getByRole("link", { name: "Open Mandalas Hostal repository" }),
  ).toBeVisible()
  await expect(
    firstProject.getByRole("link", { name: "Open Mandalas Hostal demo" }),
  ).toBeVisible()
})

test("mantiene el archivo dentro del recorrido público y ofrece un siguiente paso", async ({ page }) => {
  await page.goto("/projects")

  await expect(page.getByRole("link", { name: "Pascal.dev home" })).toHaveAttribute("href", "/")
  const navigation = page.getByRole("navigation", { name: "Primary navigation" })
  await expect(navigation.getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "page")
  await expect(page.getByRole("heading", { level: 1, name: "Projects" })).toBeVisible()
  await expect(page.getByRole("contentinfo", { name: "Footer" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Discuss a project" })).toHaveAttribute("href", "/#contact")
})

test("conecta el caso de estudio con el archivo, la portada y contacto", async ({ page }) => {
  await page.goto("/projects/nativa-market")

  await expect(page.getByRole("heading", { level: 1, name: "Nativa Market" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Back to projects" })).toHaveAttribute("href", "/projects")
  await expect(page.getByRole("link", { name: "Browse all work" })).toHaveAttribute("href", "/projects")
  await expect(page.getByRole("link", { name: "Discuss a similar project" })).toHaveAttribute("href", "/#contact")
  await expect(page.getByRole("contentinfo", { name: "Footer" })).toBeVisible()
})

test("mantiene el relato en una columna hasta escritorio y sin overflow", async ({ page }) => {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1023, height: 768 },
  ]) {
    await page.setViewportSize(viewport)
    await page.goto("/projects/nativa-market")

    const context = page.getByRole("heading", { name: /Context/ })
    const details = page.getByRole("complementary", { name: "Project details" })
    const [contextBox, detailsBox] = await Promise.all([context.boundingBox(), details.boundingBox()])

    expect(contextBox).not.toBeNull()
    expect(detailsBox).not.toBeNull()
    expect(detailsBox!.y).toBeGreaterThan(contextBox!.y)
    expect(Math.abs(detailsBox!.x - contextBox!.x)).toBeLessThanOrEqual(1)

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }))
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth)
  }
})

test("activa el panel técnico lateral y sticky solo en escritorio", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto("/projects/nativa-market")

  const context = page.getByRole("heading", { name: /Context/ })
  const details = page.getByRole("complementary", { name: "Project details" })
  const [contextBox, detailsBox] = await Promise.all([context.boundingBox(), details.boundingBox()])

  expect(contextBox).not.toBeNull()
  expect(detailsBox).not.toBeNull()
  expect(detailsBox!.x).toBeLessThan(contextBox!.x)
  await expect(details.locator("div").first()).toHaveCSS("position", "sticky")
})
