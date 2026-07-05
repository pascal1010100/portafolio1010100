import { expect, test } from "@playwright/test"

test("presenta la propuesta y permite navegar por las secciones principales", async ({ page }) => {
  await page.goto("/")

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Software claro para sistemas que deben evolucionar",
  )
  await expect(page.getByRole("navigation", { name: "Navegación principal" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Ver trabajo" })).toHaveAttribute("href", "#projects")
  await expect(page.getByRole("link", { name: "Iniciar conversación" })).toHaveAttribute("href", "#contact")
  await expect(
    page.getByRole("heading", { name: "Casos que demuestran criterio de producto e ingeniería" }),
  ).toBeVisible()
})

test("mantiene el recorrido principal usable en móvil y sin overflow horizontal", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  const menuButton = page.getByRole("button", { name: "Abrir menú" })
  await expect(menuButton).toBeVisible()
  await menuButton.click()
  await expect(page.getByRole("navigation", { name: "Navegación móvil" })).toBeVisible()

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }))
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth)
})
