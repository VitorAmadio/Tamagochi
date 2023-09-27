import { create } from 'zustand';

interface AuthStore {
  token: string | null;
  setToken: (newToken: string | null) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  setToken: (newToken) => set({ token: newToken }),
}));

export default useAuthStore;
