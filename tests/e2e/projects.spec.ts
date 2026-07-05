import { expect, test } from "@playwright/test"

test("permite buscar y abrir un caso de trabajo", async ({ page }) => {
  await page.goto("/projects")

  await expect(page.getByRole("heading", { name: "Casos de trabajo" })).toBeVisible()
  await page.getByPlaceholder("Buscar proyectos...").fill("Open Narrative")
  await expect(page.getByRole("heading", { name: "Open Narrative" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Nativa Market" })).toHaveCount(0)

  await page.getByRole("heading", { name: "Open Narrative" }).click()
  await expect(page).toHaveURL(/\/projects\/open-narrative$/)
  await expect(page.getByRole("heading", { level: 1, name: "Open Narrative" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Evidencia" })).toBeVisible()
})

test("responde con 404 para un proyecto inexistente", async ({ page }) => {
  const response = await page.goto("/projects/caso-inexistente")

  expect(response?.status()).toBe(404)
})
