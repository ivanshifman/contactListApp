import { createStore } from "zustand/vanilla";

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

export const userStore = createStore<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

