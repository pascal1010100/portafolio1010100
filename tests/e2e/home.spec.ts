import { expect, test } from "@playwright/test"

test("presenta la propuesta y permite navegar por las secciones principales", async ({ page }) => {
  await page.goto("/")

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Web products built around real business needs.",
  )
  const primaryNavigation = page.getByRole("navigation", {
    name: "Primary navigation",
  })
  await expect(primaryNavigation).toBeVisible()
  await expect(page.locator("#home").getByRole("link", { name: "Discuss your project" })).toHaveAttribute("href", "#contact")
  await expect(page.getByRole("link", { name: "See selected work" })).toHaveAttribute("href", "#projects")
  await expect(
    page.getByRole("heading", { name: "Real work, documented decisions, and evidence you can review" }),
  ).toBeVisible()
  await expect(page.locator("#projects article")).toHaveCount(3)
  const sectionOrder = await page.locator("main > section").evaluateAll((sections) =>
    sections.map((section) => section.id),
  )
  expect(sectionOrder).toEqual(["home", "projects", "services", "process", "skills", "about", "contact"])
  await expect(page.getByRole("link", { name: "View all projects" })).toHaveAttribute(
    "href",
    "/projects",
  )
})

test("mantiene el recorrido principal usable en móvil y sin overflow horizontal", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  const menuButton = page.getByRole("button", { name: "Open menu" })
  await expect(menuButton).toBeVisible()
  await menuButton.click()
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden()
  await expect(menuButton).toBeFocused()
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
  const skipLink = page.getByRole("link", { name: "Skip to main content" })
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
  await page.getByRole("button", { name: "Open menu" }).click()
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible()
})

test("comunica campos obligatorios e instrucciones del formulario", async ({ page }) => {
  await page.goto("/#contact")

  const name = page.getByRole("textbox", { name: /Name.*required/ })
  const context = page.getByRole("textbox", {
    name: /Tell me about the problem.*required/,
  })

  await expect(name).toHaveAttribute("required", "")
  await expect(name).toHaveAccessibleDescription("Enter at least 2 characters.")
  await expect(context).toHaveAttribute("required", "")
  await expect(context).toHaveAccessibleDescription(
    /Enter at least 10 characters.*Nothing is sent automatically/,
  )
})

test("mantiene objetivos táctiles y ancho estable en contextos compactos", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  const touchTargets = [
    page.getByRole("button", { name: "Open menu" }),
    page.locator("#about").getByRole("link", { name: "View GitHub" }),
    page.locator("#projects").getByRole("link", { name: /Read .* case study/ }).first(),
    page.locator("#projects").getByRole("link", { name: /Open .* demo/ }).first(),
    page.locator("#services").getByRole("link", { name: /Discuss / }).first(),
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

test("mantiene el hero compacto y sin overflow en tablet", async ({ page }) => {
  for (const viewport of [
    { width: 768, height: 1024 },
    { width: 1023, height: 768 },
    { width: 1024, height: 768 },
  ]) {
    await page.setViewportSize(viewport)
    await page.goto("/")

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      heroHeight: document.querySelector<HTMLElement>("#home")?.getBoundingClientRect().height ?? 0,
    }))

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth)
    expect(dimensions.heroHeight).toBeLessThanOrEqual(950)
    await expect(page.locator("#home").getByRole("link", { name: "Discuss your project" })).toBeVisible()
    await expect(page.locator("#home").getByRole("link", { name: "See selected work" })).toBeVisible()
    await expect(page.locator(".hero-scene")).toBeVisible()
  }
})

test("actualiza la navegación activa al recorrer trabajo y contacto", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto("/")

  const primaryNavigation = page.getByRole("navigation", { name: "Primary navigation" })
  await page.locator("#projects").scrollIntoViewIfNeeded()
  await expect(primaryNavigation.getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "location")

  await page.locator("#contact").scrollIntoViewIfNeeded()
  await expect(primaryNavigation.getByRole("link", { name: "Discuss your project" })).toHaveAttribute("aria-current", "location")
})
