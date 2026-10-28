import { expect, test } from "@playwright/test"

test("presenta la propuesta y permite navegar por las secciones principales", async ({ page }, testInfo) => {
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
  await page.locator(".hero-scene canvas").waitFor({ state: "visible" })
  await page.screenshot({ path: testInfo.outputPath("consolidated-desktop.png") })
  const sectionOrder = await page.locator("main > section").evaluateAll((sections) =>
    sections.map((section) => section.id),
  )
  expect(sectionOrder).toEqual(["home", "projects", "services", "process", "skills", "about", "contact"])
  await expect(page.getByRole("link", { name: "View all projects" })).toHaveAttribute(
    "href",
    "/projects",
  )
})

test("mantiene el recorrido principal usable en móvil y sin overflow horizontal", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  const menuButton = page.getByRole("button", { name: "Open menu" })
  await expect(menuButton).toBeVisible()
  await menuButton.click()
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden()
  await expect(menuButton).toBeFocused()
  await expect(page.locator(".hero-scene")).toBeVisible()

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    heroHeight: document.querySelector<HTMLElement>("#home")?.getBoundingClientRect().height ?? 0,
  }))
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth)
  expect(dimensions.heroHeight).toBeLessThanOrEqual(1100)
  await page.locator(".hero-scene canvas").waitFor({ state: "visible" })
  await page.screenshot({ path: testInfo.outputPath("consolidated-mobile.png"), fullPage: true })
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

test("mantiene el contenido disponible cuando WebGL no puede iniciar", async ({ page }) => {
  await page.addInitScript(() => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext

    HTMLCanvasElement.prototype.getContext = function getContext(
      this: HTMLCanvasElement,
      contextId: string,
      ...args: unknown[]
    ) {
      if (contextId === "webgl" || contextId === "webgl2") return null

      return originalGetContext.call(this, contextId, ...args)
    } as typeof HTMLCanvasElement.prototype.getContext
  })

  await page.goto("/")

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
  await expect(page.getByTestId("spatial-scene-fallback")).toBeVisible()
  await expect(page.locator("body")).not.toContainText("Application error")
  await expect(page.locator("#home").getByRole("link", { name: "Discuss your project" })).toBeVisible()
})

test("renderiza la escena 3D cuando WebGL está disponible", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/")

  await expect(page.locator(".hero-scene canvas")).toBeVisible({ timeout: 15_000 })
  await expect(page.getByTestId("spatial-scene-fallback")).toHaveCount(0)
})

test("anima solo mientras la escena está realmente visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/")

  const scene = page.locator(".hero-scene")
  await expect(scene).toHaveAttribute("data-scene-loaded", "true")
  await expect(scene).toHaveAttribute("data-scene-motion", "running")

  await page.locator("#contact").scrollIntoViewIfNeeded()
  await expect(scene).toHaveAttribute("data-scene-motion", "paused")

  await page.locator("#home").scrollIntoViewIfNeeded()
  await expect(scene).toHaveAttribute("data-scene-motion", "running")

  await page.getByRole("button", { name: "Pause motion" }).click()
  await expect(scene).toHaveAttribute("data-scene-motion", "paused")
  await page.getByRole("button", { name: "Resume motion" }).click()
  await expect(scene).toHaveAttribute("data-scene-motion", "running")
  await page.mouse.move(0, 0)
  const canvas = scene.locator("canvas")
  const clip = await canvas.boundingBox()
  expect(clip).not.toBeNull()
  const movingBefore = await page.screenshot({ clip: clip! })
  await page.waitForTimeout(650)
  const movingAfter = await page.screenshot({ clip: clip! })
  expect(movingBefore.equals(movingAfter)).toBe(false)

  await page.emulateMedia({ reducedMotion: "reduce" })
  await expect(scene).toHaveAttribute("data-scene-motion", "reduced")
  await page.waitForTimeout(250)
  const stillBefore = await page.screenshot({ clip: clip! })
  await page.waitForTimeout(650)
  const stillAfter = await page.screenshot({ clip: clip! })
  expect(stillBefore.equals(stillAfter)).toBe(true)
})

test("responde al evento de visibilidad simulada sin fingir una pestaña real", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/")
  const scene = page.locator(".hero-scene")
  await expect(scene).toHaveAttribute("data-scene-motion", "running")
  for (const state of ["hidden", "visible"]) {
    await page.evaluate((visibility) => {
      Object.defineProperty(document, "visibilityState", { configurable: true, get: () => visibility })
      document.dispatchEvent(new Event("visibilitychange"))
    }, state)
    await expect(scene).toHaveAttribute("data-scene-motion", state === "hidden" ? "paused" : "running")
  }
})

test("recompone la escena por viewport sin ligar el encuadre a la calidad", async ({ page }) => {
  const viewports = [
    { width: 390, height: 844, composition: "phone", minimumSceneHeight: 300 },
    { width: 768, height: 1024, composition: "tablet", minimumSceneHeight: 340 },
    { width: 1024, height: 768, composition: "desktop", minimumSceneHeight: 500 },
  ]

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto("/")

    const scene = page.locator(".hero-scene")
    await expect(scene).toHaveAttribute("data-scene-composition", viewport.composition)
    await expect(scene.locator("canvas")).toBeVisible({ timeout: 15_000 })

    const dimensions = await scene.evaluate((element) => {
      const rect = element.getBoundingClientRect()
      return { height: rect.height, right: rect.right, left: rect.left }
    })
    expect(dimensions.height).toBeGreaterThanOrEqual(viewport.minimumSceneHeight)
    expect(dimensions.left).toBeGreaterThanOrEqual(-32)
    expect(dimensions.right).toBeLessThanOrEqual(viewport.width + 32)
    await expect(scene).toHaveAttribute("data-scene-quality", /^(low|standard)$/)
  }
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
    expect(dimensions.heroHeight).toBeLessThanOrEqual(1100)
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
