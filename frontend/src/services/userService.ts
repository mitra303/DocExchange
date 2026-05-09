import { api } from "./api";

export const getUsers = async () => {

  const { data } =
    await api.get("/auth/users");

  return data;
};

export const createUser = async (
  payload: any
) => {

  const { data } =
    await api.post(
      "/auth/register",
      payload
    );

  return data;
};

export const updateUser = async (
  id: string,
  payload: any
) => {

  const { data } =
    await api.put(
      `/auth/users/${id}`,
      payload
    );

  return data;
};

export const changePassword =
  async (
    payload: {
      password: string;
    }
  ) => {

    const { data } =
      await api.put(
        "/auth/change-password",
        payload
      );

    return data;
  };