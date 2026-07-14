import { expect, test } from "@playwright/test"

test("abre WhatsApp con el contexto del formulario", async ({ page }) => {
  await page.addInitScript(() => {
    window.open = (url) => {
      document.documentElement.dataset.openedUrl = String(url)
      return null
    }
  })

  await page.goto("/")
  await page.getByLabel("Nombre").fill("Persona de prueba")
  await page.getByLabel("Producto o reto").fill("Plataforma de reservas")
  await page.getByLabel("Contexto para el diagnóstico").fill(
    "Necesito validar el flujo público del formulario de contacto.",
  )
  await page.getByRole("button", { name: "Continuar por WhatsApp" }).click()

  const expectedMessage = [
    "Hola Pascal, vi tu portafolio y me gustaría conversar sobre un proyecto.",
    "",
    "Nombre: Persona de prueba",
    "Producto o reto: Plataforma de reservas",
    "",
    "Contexto:",
    "Necesito validar el flujo público del formulario de contacto.",
  ].join("\n")

  await expect(page.locator("html")).toHaveAttribute(
    "data-opened-url",
    `https://wa.me/50242900009?text=${encodeURIComponent(expectedMessage)}`,
  )
})

test("ofrece WhatsApp como canal de contacto directo", async ({ page }) => {
  await page.goto("/")

  await expect(page.getByRole("link", { name: "+502 4290 0009" })).toHaveAttribute(
    "href",
    "https://wa.me/50242900009",
  )
})
