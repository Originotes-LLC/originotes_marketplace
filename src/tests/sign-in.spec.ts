import { setupClerkTestingToken } from "@clerk/testing/playwright";
import { test } from "@playwright/test";

test("test", async ({ page }) => {
  await setupClerkTestingToken({ page });
  await page.goto("/");
});
