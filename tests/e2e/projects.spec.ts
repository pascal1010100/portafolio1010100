import { expect, test } from "@playwright/test"

test("permite buscar y abrir un proyecto", async ({ page }) => {
  await page.goto("/projects")

  await expect(page.getByRole("heading", { name: "Proyectos" })).toBeVisible()
  await page.getByPlaceholder("Buscar proyectos...").fill("Open Narrative")
  await expect(page.getByRole("heading", { level: 2, name: "Open Narrative" })).toBeVisible()
  await expect(page.getByRole("heading", { level: 2, name: "Nativa Market" })).toHaveCount(0)

  await page.getByRole("heading", { name: "Open Narrative" }).click()
  await expect(page).toHaveURL(/\/projects\/open-narrative$/)
  await expect(page.getByRole("heading", { level: 1, name: "Open Narrative" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Enlaces para comprobarlo" })).toBeVisible()
})

test("responde con 404 para un proyecto inexistente", async ({ page }) => {
  const response = await page.goto("/projects/caso-inexistente")

  expect(response?.status()).toBe(404)
  await expect(
    page.getByRole("heading", { name: "Esta coordenada quedó fuera del mapa." }),
  ).toBeVisible()
  await expect(page.getByRole("link", { name: "Volver al inicio" })).toHaveAttribute("href", "/")
  await expect(page.getByRole("link", { name: "Ver proyectos" })).toHaveAttribute(
    "href",
    "/projects",
  )
})

test("expone nombres accesibles para buscar y abrir recursos", async ({ page }) => {
  await page.goto("/projects")

  await expect(page.getByRole("textbox", { name: "Buscar proyectos" })).toBeVisible()

  const firstProject = page.locator("[class*='group']").filter({
    has: page.getByRole("heading", { name: "Mandalas Hostal" }),
  }).first()

  await expect(
    firstProject.getByRole("link", { name: "Abrir repositorio de Mandalas Hostal" }),
  ).toBeVisible()
  await expect(
    firstProject.getByRole("link", { name: "Abrir demo de Mandalas Hostal" }),
  ).toBeVisible()
})
