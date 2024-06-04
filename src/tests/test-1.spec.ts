import { expect, test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("./vendor/listings?page=1");
  expect(page.url()).toBe(
    "http://127.0.0.1:3000/sign-in?redirect_url=http%3A%2F%2F127.0.0.1%3A3000%2Fvendor%2Flistings%3Fpage%3D1",
  );
});
