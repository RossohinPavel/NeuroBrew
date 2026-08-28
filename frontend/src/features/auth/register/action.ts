"use server";

export const registerStub = (argument: unknown) => {
  return Promise.resolve(argument);
};

export const registerAction = async (formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    username: formData.get("username"),
  };

  await registerStub(data);
};
