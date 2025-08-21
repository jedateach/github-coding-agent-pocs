import { axios } from "@myrepo/api-client";

export interface Account {
  id: string;
  name: string;
  balance: number;
}

export async function getAccounts(): Promise<Account[]> {
  const res = await axios.get("/accounts");
  return res.data;
}