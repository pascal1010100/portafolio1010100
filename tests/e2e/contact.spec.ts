import { expect, test } from "@playwright/test"

test("abre WhatsApp con el contexto del formulario", async ({ page }) => {
  await page.addInitScript(() => {
    window.open = (url) => {
      document.documentElement.dataset.openedUrl = String(url)
      return null
    }
  })

  await page.goto("/")
  await page.getByLabel("Name").fill("Test person")
  await page.getByLabel("What do you need help with?").fill("Booking platform")
  await page.getByLabel(/Tell me about the problem.*required/).fill(
    "I need to validate the public contact form flow.",
  )
  await page.getByRole("button", { name: "Review message in WhatsApp" }).click()

  const expectedMessage = [
    "Hi Pascal, I visited Pascal.dev and would like to discuss a project.",
    "",
    "Name: Test person",
    "Project or idea: Booking platform",
    "",
    "Context:",
    "I need to validate the public contact form flow.",
  ].join("\n")

  await expect(page.locator("html")).toHaveAttribute(
    "data-opened-url",
    `https://wa.me/50242900009?text=${encodeURIComponent(expectedMessage)}`,
  )
  await expect(page.getByRole("status")).toContainText("Open the prepared message directly")
})

test("ofrece WhatsApp como canal de contacto directo", async ({ page }) => {
  await page.goto("/")

  await expect(page.getByRole("link", { name: "+502 4290 0009" })).toHaveAttribute(
    "href",
    "https://wa.me/50242900009",
  )
})
