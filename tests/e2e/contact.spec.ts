import { expect, test } from "@playwright/test"

test("valida el contrato HTTP del endpoint sin enviar correo", async ({ request }) => {
  const unsupported = await request.post("/api/contact", {
    data: "texto plano",
    headers: { "content-type": "text/plain" },
  })
  expect(unsupported.status()).toBe(415)

  const invalid = await request.post("/api/contact", {
    data: { name: "A", email: "incorrecto", message: "corto" },
  })
  expect(invalid.status()).toBe(400)

  const honeypot = await request.post("/api/contact", {
    data: {
      name: "Prueba automatizada",
      email: "test@example.com",
      message: "Este mensaje no debe salir del servidor.",
      website: "https://bot.invalid",
    },
  })
  expect(honeypot.status()).toBe(200)
  expect(await honeypot.json()).toEqual({ ok: true })
})

test("muestra confirmación cuando el formulario recibe una respuesta correcta", async ({ page }) => {
  await page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, id: "test-message" }),
    })
  })

  await page.goto("/")
  await page.getByLabel("Nombre").fill("Persona de prueba")
  await page.getByLabel("Correo", { exact: true }).fill("persona@example.com")
  await page.getByLabel("Contexto para el diagnóstico").fill(
    "Necesito validar el flujo público del formulario de contacto.",
  )
  await page.getByRole("button", { name: "Solicitar conversación" }).click()

  await expect(page.getByRole("status")).toHaveText("Gracias. Tu mensaje fue enviado correctamente.")
  await expect(page.getByRole("button", { name: "Mensaje enviado" })).toBeDisabled()
})
