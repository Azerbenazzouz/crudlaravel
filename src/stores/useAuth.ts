import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isLoggedIn: false,
    user: null,
    token: null,
  }),
  getters: {
    isAuthenticated: (state) => state.isLoggedIn,
  },
  actions: {
    login(user: any, token: any) {
      this.isLoggedIn = true;
      this.user = user;
      this.token = token;
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
      this.token = null;
    },
  },
});
