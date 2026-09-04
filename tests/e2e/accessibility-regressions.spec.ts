import { expect, test } from "@playwright/test"

test("mantiene el botón de regreso al inicio fuera de la navegación cuando está oculto", async ({
  page,
}) => {
  await page.goto("/")

  const backToTop = page.locator('button[aria-label="Back to top"]')

  await expect(backToTop).toHaveAttribute("aria-hidden", "true")
  await expect(backToTop).toHaveAttribute("tabindex", "-1")
  await expect(page.getByRole("button", { name: "Back to top" })).toHaveCount(0)

  await page.evaluate(() => window.scrollTo(0, 500))

  await expect(backToTop).toHaveAttribute("aria-hidden", "false")
  await expect(backToTop).toHaveAttribute("tabindex", "0")
  await expect(page.getByRole("button", { name: "Back to top" })).toBeVisible()
})

test("muestra un foco consistente en los campos del formulario de contacto", async ({
  page,
}) => {
  await page.goto("/#contact")

  const fields = [
    page.getByRole("textbox", { name: /Name.*required/ }),
    page.getByRole("textbox", { name: "What do you need help with?" }),
    page.getByRole("textbox", { name: /Tell me about the problem.*required/ }),
  ]

  for (const field of fields) {
    await field.focus()
    await expect(field).toBeFocused()

    const boxShadow = await field.evaluate((element) =>
      getComputedStyle(element).boxShadow,
    )
    expect(boxShadow).not.toBe("none")
  }
})
