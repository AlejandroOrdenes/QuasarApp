import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    firstName: null,
    lastName: null,
    email: null
  }),

  getters: {
    getId: (state) => state.id,
    getFirstName: (state) => state.firstName,
    getLastName: (state) => state.lastName,
    getEmail: (state) => state.email,
  },

  actions: {

     async login (email, password) {
      const data = {
        email: email,
        password: password
      }
        await this.$axios.post("http://localhost:3003/api/login", data).then((response) => {
          console.log(response);
          alert("Datos correctos");
        })
        .catch((err) => {
          console.log(err);
          console.log("Error al obtener datos!");
        });

    },

    // async fetchUser () {
    //   try {
    //     return await this.$axios.get("http://localhost:3003/api/user")
    //   } catch (error) {
    //     if (error) throw error
    //   }
    // },


    setUser (payload) {
      if (payload.id) this.id = payload.id
      if (payload.firstName) this.id = payload.firstName
      if (payload.lastName) this.id = payload.lastName
      if (payload.email) this.id = payload.email

    },

    clearUser () {
      this.id = null,
      this.lastName = null,
      this.firstName = null,
      this.email = null
    }
  }
})
