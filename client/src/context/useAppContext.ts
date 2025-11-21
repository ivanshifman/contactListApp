import { useStore } from "zustand";
import { userStore } from "../store/userStore";

export const useAppContext = () => {
  const user = useStore(userStore, (state) => state.user);
  const setUser = useStore(userStore, (state) => state.setUser);
  const logout = useStore(userStore, (state) => state.logout);

  return { user, setUser, logout };
};
