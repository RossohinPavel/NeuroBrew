"use server";


/** Принимает учетные данные из формы входа для серверной аутентификации. */
export const loginAction = async (formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  await (() => Promise.resolve(data))();
};
