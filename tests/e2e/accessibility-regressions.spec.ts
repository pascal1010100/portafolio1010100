import { expect, test } from "@playwright/test"

for (const { route, activeLink } of [
  { route: "/projects", activeLink: "Work" },
  { route: "/projects/nativa-market", activeLink: "Work" },
  { route: "/hiring", activeLink: "Hiring" },
]) {
  test(`identifica la página activa en el menú móvil de ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(route)
    const menuButton = page.getByRole("button", { name: "Open menu" })
    await menuButton.click()
    const navigation = page.getByRole("navigation", { name: "Mobile navigation" })
    const currentLink = navigation.getByRole("link", { name: activeLink, exact: true })
    await expect(currentLink).toHaveAttribute("aria-current", "page")
    await expect(currentLink).toHaveCSS("text-decoration-line", "underline")
    await expect(navigation.locator("[aria-current]")).toHaveCount(1)
    await page.keyboard.press("Escape")
    await expect(navigation).toBeHidden()
    await expect(menuButton).toBeFocused()
  })
}

test("actualiza la sección activa del menú móvil al recorrer la portada", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  for (const { id, name } of [
    { id: "projects", name: "Work" },
    { id: "services", name: "Services" },
    { id: "contact", name: "Discuss your project" },
  ]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded()
    await page.getByRole("button", { name: "Open menu" }).click()
    const navigation = page.getByRole("navigation", { name: "Mobile navigation" })
    await expect(navigation.getByRole("link", { name, exact: true })).toHaveAttribute("aria-current", "location")
    await expect(navigation.locator("[aria-current]")).toHaveCount(1)
    await page.keyboard.press("Escape")
  }
})

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
