import { clerkSetup } from "@clerk/testing/playwright";
import { test as setup } from "@playwright/test";

// eslint-disable-next-line no-empty-pattern
setup("global setup", async ({}) => {
  await clerkSetup();
});
