import { useStore } from "zustand";
import { userStore } from "../store/userStore";

export const useAppContext = () => {
  return useStore(userStore);
};
