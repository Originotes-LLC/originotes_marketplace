import { setupClerkTestingToken } from "@clerk/testing/playwright";
import { test } from "@playwright/test";

test("sign-in with Clerk", async ({ page }) => {
  await setupClerkTestingToken({ page });
});
