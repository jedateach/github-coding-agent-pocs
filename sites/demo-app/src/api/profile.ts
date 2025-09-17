import { axios } from "@myrepo/api-client";

export interface Profile {
  name: string;
  email: string;
}

export async function getProfile(): Promise<Profile> {
  const res = await axios.get("/me");
  return res.data;
}