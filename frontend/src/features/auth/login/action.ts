"use server";


export const loginAction = async (formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  () => data;
};
