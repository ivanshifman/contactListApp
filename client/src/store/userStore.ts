import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

interface IUser {
  id: number;
  name: string;
  username: string;
  createdAt: string;
}

type Store = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  logout: () => void;
};

export const userStore = createStore<Store>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-auth",
    }
  )
);
