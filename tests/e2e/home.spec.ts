import { expect, test } from "@playwright/test"

test("presenta la propuesta y permite navegar por las secciones principales", async ({ page }) => {
  await page.goto("/")

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Software claro para sistemas que deben evolucionar",
  )
  const primaryNavigation = page.getByRole("navigation", {
    name: "Navegación principal",
  })
  await expect(primaryNavigation).toBeVisible()
  await expect(primaryNavigation.getByRole("link", { name: "Inicio" })).toHaveAttribute(
    "aria-current",
    "location",
  )
  await expect(page.getByRole("link", { name: "Ver trabajo" })).toHaveAttribute("href", "#projects")
  await expect(page.getByRole("link", { name: "Iniciar conversación" })).toHaveAttribute("href", "#contact")
  await expect(
    page.getByRole("heading", { name: "Casos que demuestran criterio de producto e ingeniería" }),
  ).toBeVisible()
  await expect(page.locator("#projects article")).toHaveCount(3)
  await expect(page.getByRole("link", { name: "Explorar todos los casos" })).toHaveAttribute(
    "href",
    "/projects",
  )
})

test("mantiene el recorrido principal usable en móvil y sin overflow horizontal", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  const menuButton = page.getByRole("button", { name: "Abrir menú" })
  await expect(menuButton).toBeVisible()
  await menuButton.click()
  await expect(page.getByRole("navigation", { name: "Navegación móvil" })).toBeVisible()
  await expect(page.locator(".hero-scene")).toBeHidden()

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    heroHeight: document.querySelector<HTMLElement>("#home")?.getBoundingClientRect().height ?? 0,
  }))
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth)
  expect(dimensions.heroHeight).toBeLessThanOrEqual(844)
})

test("permite saltar la navegación con teclado", async ({ page }) => {
  await page.goto("/")

  await page.keyboard.press("Tab")
  const skipLink = page.getByRole("link", { name: "Saltar al contenido" })
  await expect(skipLink).toBeFocused()
  await skipLink.press("Enter")
  await expect(page.locator("#main-content")).toBeFocused()
})

test("respeta la preferencia de movimiento reducido", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")

  const motionPreferences = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement)
    const title = getComputedStyle(document.querySelector(".hero-title")!)

    return {
      scrollBehavior: root.scrollBehavior,
      titleAnimation: title.animationName,
    }
  })

  expect(motionPreferences.scrollBehavior).toBe("auto")
  expect(motionPreferences.titleAnimation).toBe("none")

  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole("button", { name: "Abrir menú" }).click()
  await expect(page.getByRole("navigation", { name: "Navegación móvil" })).toBeVisible()
})

test("comunica campos obligatorios e instrucciones del formulario", async ({ page }) => {
  await page.goto("/#contact")

  const name = page.getByRole("textbox", { name: /Nombre.*obligatorio/ })
  const context = page.getByRole("textbox", {
    name: /Contexto para el diagnóstico.*obligatorio/,
  })

  await expect(name).toHaveAttribute("required", "")
  await expect(name).toHaveAccessibleDescription("Escribe al menos 2 caracteres.")
  await expect(context).toHaveAttribute("required", "")
  await expect(context).toHaveAccessibleDescription(
    /Incluye al menos 10 caracteres.*No se enviará nada automáticamente/,
  )
})

test("mantiene objetivos táctiles y ancho estable en contextos compactos", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  const touchTargets = [
    page.getByRole("button", { name: "Abrir menú" }),
    page.locator("#home").getByRole("link", { name: "GitHub" }),
    page.locator("#projects").getByRole("link", { name: /Ver caso/ }).first(),
    page.locator("#projects").getByRole("link", { name: /Abrir demo/ }).first(),
    page.locator("#services").getByRole("link", { name: /Consultar/ }).first(),
  ]

  for (const target of touchTargets) {
    const box = await target.boundingBox()
    expect(box).not.toBeNull()
    expect(box?.width).toBeGreaterThanOrEqual(44)
    expect(box?.height).toBeGreaterThanOrEqual(44)
  }

  for (const viewport of [
    { width: 320, height: 568 },
    { width: 768, height: 1024 },
    { width: 844, height: 390 },
  ]) {
    await page.setViewportSize(viewport)
    await page.reload()

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }))
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth)
  }
})
