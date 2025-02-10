import ApiUrl from '@/api/apiConfig'
import type { User } from '@/models/User'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null as User | null,
    token: null as string | null,
  }),

  getters: {
    isAuthenticated(): boolean {
      // console.log('isAuthenticated', this.isLoggedIn && !!this.token)
      return !!localStorage.getItem('token')
    },
    currentUser(): User | null {
      return this.user
    },
  },

  actions: {
    async login(token: string) {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${ApiUrl}auth/me`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      try {
        await axios.request(config)
          .then((response) => {
            const user : User = response.data.original.data.auth as User;
            this.setAuthData(user, token as unknown as string)
            return response;
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.error('Erreur lors de la connexion :', error)
        throw error
      }
    },

    setAuthData(user: User, token: string) {
      this.isLoggedIn = true
      this.user = user
      this.token = token
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },

    logout() {
      this.isLoggedIn = false
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    async checkAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${ApiUrl}auth/me`,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        try {
          await axios.request(config)
            .then((response) => {
              const user : User = response.data.original.data.auth as User;
              this.setAuthData(user, token)
              return response;
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.error('Erreur lors de la connexion :', error)
          throw error
        }
      }
    },
  },
})
