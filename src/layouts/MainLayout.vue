<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          BoiletApp
        </q-toolbar-title>
        <q-btn @click="logout" v-if="store.userIsAuthorized">Logout</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          WebSite
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import {useUserStore} from '../stores/auth'
import { useRouter } from "vue-router";


const linksList = [
  {
    title: 'Boilet',
    caption: 'www.boilet.cl',
    icon: 'code',
    link: 'https://boilet.cl'
  },
]

export default defineComponent({
  name: 'MainLayout',


  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const store = useUserStore()
    const router = useRouter()

    return {
      store,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      logout () {
        store.userIsAuthorized = false
        router.push('/')
      }
    }
  }
})
</script>
