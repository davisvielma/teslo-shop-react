import { tesloApi } from "@/api/teslo-api";
import type { AuthResponse } from "@/interfaces/auth.response";

interface Options {
  email: string;
  password: string;
  fullName: string;
}

export const registerAction = async ({
  email,
  password,
  fullName,
}: Options): Promise<AuthResponse> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>("auth/register", {
      email,
      password,
      fullName,
    });

    return data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
