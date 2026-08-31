"use server";

import { DB } from "@/settings";


export const registerAction = async (formData: FormData) => {
  const email = formData.get("email");
  if (typeof email !== "string") {
    throw new Error("Email is required");
  }

  await DB.auth.createUser({ email });
};
