<template>
  <v-app-bar color="white" elevate-on-scroll flat app>
    <v-container class="pa-0">
      <v-row align="center" justify="space-between">
        <!-- Logo or App Name -->
        <v-col cols="auto">
          <v-toolbar-title class="font-weight-bold text-h5 primary--text">
            Ai Content Generator
          </v-toolbar-title>
        </v-col>

        <!-- Navigation Links -->
        <v-col cols="auto" class="d-none d-md-flex">
          <v-btn text to="/" class="text-capitalize mx-2">Accueil</v-btn>
          <v-btn text to="/about" class="text-capitalize mx-2">À propos</v-btn>
        </v-col>

        <!-- Spacer for Responsive Layout -->
        <v-spacer class="d-md-none"></v-spacer>

        <!-- Auth Buttons -->
        <v-col cols="auto" v-if="!authStore.isAuthenticated" class="d-none d-md-flex">
          <v-btn text to="/login" class="text-capitalize mx-2">Connexion</v-btn>
          <v-btn color="primary" to="/register" class="text-capitalize mx-2" outlined>
            Inscription
          </v-btn>
        </v-col>

        <v-col cols="auto" v-if="authStore.isAuthenticated" class="d-none d-md-flex">
          <v-btn text to="/dashboard" class="text-capitalize mx-2">Dashboard</v-btn>
          <v-btn color="primary" @click="handleLogout" class="text-capitalize mx-2" outlined>
            Déconnexion
          </v-btn>
        </v-col>

        <!-- Mobile Menu Toggle -->
        <v-col cols="auto" class="d-flex d-md-none">
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </v-col>
      </v-row>
    </v-container>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary right app>
      <v-list nav dense>
        <v-list-item to="/" link>
          <v-list-item-title>Accueil</v-list-item-title>
        </v-list-item>
        <v-list-item to="/about" link>
          <v-list-item-title>À propos</v-list-item-title>
        </v-list-item>
        <template v-if="!authStore.isAuthenticated">
          <v-list-item to="/login" link>
            <v-list-item-title>Connexion</v-list-item-title>
          </v-list-item>
          <v-list-item to="/register" link>
            <v-list-item-title>Inscription</v-list-item-title>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item to="/dashboard" link>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item @click="handleLogout" link>
            <v-list-item-title>Déconnexion</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuth'

const router = useRouter()
const authStore = useAuthStore()
const drawer = ref(false)

const handleLogout = async () => {
  authStore.logout()
  await router.push('/login')
}

onMounted(() => {
  authStore.checkAuth()
})
</script>

<style scoped>
/* Custom Styles */
.v-app-bar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.v-btn {
  font-weight: 500;
}

.v-toolbar-title {
  cursor: pointer;
}
</style>
