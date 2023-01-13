<template>
  <div
    class="q-pa-md"
    style="
      width: 100%;
      align-items: center;
      display: flex;
      align-items: center;
      flex-direction: column;
    "
  >
    <div class="q-mt-md q-gutter-md">
      <q-icon
        style="padding-bottom: 60px; padding-top: 30px"
        name="map"
        color="blue"
        size="7.4em"
      />
    </div>

    <q-form style="width: 75%" @submit="login" class="q-gutter-md">
      <q-input
        filled
        type="text"
        v-model="email"
        label="Usuario *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Ingrese usuario valido']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Password *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Ingrese password valido',
        ]"
      />

      <div style="justify-content: center; display: flex; padding-top: 20px">
        <q-btn :disable="!password || !email" type="submit" label="Ingresar" color="primary" />
      </div>
    </q-form>
    <div
      class="q-mt-md q-gutter-md"
      style="display: flex; align-items: center; flex-direction: column"
    >
      <!-- <a href="" style="text-decoration: none">Crear cuenta</a>
      <a href="" style="text-decoration: none">Restablecer contraseña</a> -->
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {useUserStore} from '../stores/auth'
// import { useUserStore } from "src/stores/auth";

export default {
  data() {
    return {
      $q: useQuasar(),
      router: useRouter(),
      email: ref(""),
      password: ref(""),
      store: useUserStore()
      
    };
  },

  methods: {
    async login() {
      const data = {
        email: this.email,
        password: this.password,
      };

      await this.$axios
        .post("http://localhost:3003/api/login", data)
        .then((response) => {
          console.log(response);
          this.$q.notify({
            color: "green-7",
            textColor: "white",
            icon: "cloud_done",
            message: "Login correcto",
          });
          this.store.userIsAuthorized = true
          this.router.push("/home");
        })
        .catch((err) => {
          console.log(err);
          this.$q.notify({
            color: "red-7",
            textColor: "white",
            icon: "warning",
            message: "Usuario y/o password incorrecto",
          });
        });
    },
  },
};
</script>
