<template>
  <!-- make it in the middle in the page -->
  <v-container fluid fill-height class="auth-background" height="100%">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card elevation="12" class="pa-6 rounded-lg">
          <!-- Logo or App Name -->
          <div class="text-center mb-6">
            <v-img
              src="https://static.vecteezy.com/system/resources/previews/010/056/184/large_2x/people-icon-sign-symbol-design-free-png.png"
              alt="Logo"
              max-width="100"
              class="mx-auto"
            ></v-img>
            <v-card-title class="text-h4 font-weight-bold primary--text mt-4">
              Connexion
            </v-card-title>
          </div>

          <!-- Login Form -->
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="email"
              label="Adresse Email"
              type="email"
              outlined
              dense
              prepend-inner-icon="mdi-email"
              class="mb-4"
              required
              :error-messages="emailErrors"
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Mot de Passe"
              type="password"
              outlined
              dense
              prepend-inner-icon="mdi-lock"
              class="mb-4"
              required
              :error-messages="passwordErrors"
            ></v-text-field>

            <!-- EMAIL Or Mdp are not true -->
            <v-alert v-if="error" type="error" dense class="mb-4">
              {{error}}
            </v-alert>

            <!-- Submit Button -->
            <v-btn block color="primary" type="submit" :loading="loading" class="font-weight-bold">
              Se Connecter
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AuthLogin, LoginModel, LoginResponseModel } from '@/api/authentification'
import type { ResponseModel } from '@/models/Response'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuth'

const email = ref('')
const password = ref('')
const loading = ref(false)
const emailErrors = ref<string[]>([])
const passwordErrors = ref<string[]>([])
const error = ref<string | null>(null)
const router = useRouter()
const authStore = useAuthStore()

const login = async () => {
  loading.value = true
  emailErrors.value = []
  passwordErrors.value = []

  const data: LoginModel = {
    email: email.value,
    password: password.value,
  }

  await AuthLogin(data)
  .then((apiResponse: ResponseModel<LoginResponseModel>) => {
    if(apiResponse.code === 200){
      authStore.login(apiResponse.data.accessToken)
      router.push('/')
    } else {
      emailErrors.value = apiResponse.errors.email || []
      passwordErrors.value = apiResponse.errors.password || []
      if(apiResponse.code === 401) {
        error.value = 'Email ou mot de passe incorrect.'
      } else {
        error.value = apiResponse.message
      }
    }
  }).finally(() => {
    loading.value = false
  })

}
</script>

<style scoped>
/* Custom Styles */
.auth-background {
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
}

.rounded-lg {
  border-radius: 16px;
}

.v-card-title {
  font-size: 2rem;
}

.v-btn {
  text-transform: capitalize;
}
</style>
