<template>
    <div class="q-pa-md" style="
      width: 100%;
      align-items: center;
      display: flex;
      align-items: center;
      flex-direction: column;
    ">
        <div class="q-mt-md q-gutter-md">
            <q-icon style="padding-bottom: 60px; padding-top: 30px" name="map" color="blue" size="7.4em" />
        </div>

        <q-form style="width: 75%" @submit="onSubmit" class="q-gutter-md">
            <q-input filled type="text" v-model="user" label="Usuario *" lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Ingrese usuario valido']" />

            <q-input filled type="number" v-model="pass" label="Password *" lazy-rules :rules="[
                (val) => (val !== null && val !== '') || 'Ingrese password valido',
            ]" />

            <div style="justify-content: center; display: flex; padding-top: 20px">
                <q-btn label="Ingresar" type="submit" color="primary" />
            </div>
        </q-form>
    </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from 'vue-router'

export default {
    setup() {
        const $q = useQuasar();
        const router = useRouter();
        const user = ref(null);
        const pass = ref(null);

        return {
            user,
            pass,

            onSubmit() {
                if (user.value == null || pass.value == null) {
                    $q.notify({
                        color: "red-7",
                        textColor: "white",
                        icon: "warning",
                        message: "Usuario y/o password incorrecto",
                    });

                    
                } else {
                    $q.notify({
                        color: "green-7",
                        textColor: "white",
                        icon: "cloud_done",
                        message: "Login correcto",
                    });
                    router.push('/home')
                }
            },

            onReset() {
                user.value = null;
                pass.value = null;
            },
        };
    },
};
</script>
