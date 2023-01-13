import { defineStore } from 'pinia';

export const useUserStore = defineStore('userIsAuthorized', {
  state: () => ({
    userIsAuthorized: false
  }),

  getters: {
    getUserAuth: (state) => state.userIsAuthorized,
    
  },

  actions: {

  }
})
