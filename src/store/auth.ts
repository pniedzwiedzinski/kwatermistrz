import { atom } from "jotai";

export const authStore = atom({
  isLoggedIn: false,
  access_token: "",
});
