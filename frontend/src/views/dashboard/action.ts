"use server";

import { safeAction, ExpectedActionError } from "@/common/safe-action";

export const testAction = safeAction(async () => {
  return "success";
});
