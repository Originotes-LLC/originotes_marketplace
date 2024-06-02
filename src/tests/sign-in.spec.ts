import { setupClerkTestingToken } from "@clerk/testing/playwright";
import { test } from "@playwright/test";

test("test", async ({ page }) => {
  await setupClerkTestingToken({ page });
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page
    .getByRole("button", { name: "Sign in with Google Google" })
    .click();
});
