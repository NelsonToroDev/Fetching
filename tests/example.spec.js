// @ts-check
import { test, expect } from '@playwright/test'
const localhost = 'http://localhost:5173/'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

test('App shows random fact and image', async ({ page }) => {
  await page.goto(localhost)

  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const textContent = await text.textContent()
  const imageSource = await image.getAttribute('src')

  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imageSource?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy()
})
