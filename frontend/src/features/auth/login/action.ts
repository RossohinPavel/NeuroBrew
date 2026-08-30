"use server";

export const loginStub = (argument: unknown) => {
  return Promise.resolve(argument);
};

export const loginAction = async (formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  await loginStub(data);
};
