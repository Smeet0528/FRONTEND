import { create } from 'zustand';

type AuthState = {
  isLoggedIn: boolean;
  userName: string | null;
  accessToken: string | null;
  login: (accessToken: string, nickname: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userName: null,
  accessToken: null,

  login: (accessToken, nickname) => {
    set({
      isLoggedIn: true,
      userName: nickname,
      accessToken,
    });
  },

  logout: () => {
    set({
      isLoggedIn: false,
      userName: null,
      accessToken: null,
    });
  },
}));
