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
              Veuillez vérifier vos informations de connexion.
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
import type { ResponseSuccessModel, ResponseErrorModel } from '@/models/Response'
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

  try {
    const apiResponse = await AuthLogin(data)

    if ((apiResponse as ResponseSuccessModel<LoginResponseModel>).original?.status) {
      const successResponse = apiResponse as ResponseSuccessModel<LoginResponseModel>
      authStore.login(successResponse.original.data.accessToken)
      router.push('/')
    } else {
      // Erreur de connexion
      const errorResponse = apiResponse as ResponseErrorModel
      if (errorResponse.errors) {
        emailErrors.value = errorResponse.errors.email || []
        passwordErrors.value = errorResponse.errors.password || []
      } else {
        emailErrors.value = [errorResponse.message]
      }
      error.value = errorResponse.message
      console.error('An error occurred:', errorResponse)
    }
  } catch (error) {
    console.error('An error occurred:', error)
    emailErrors.value = ['Une erreur inattendue est survenue.']
  } finally {
    loading.value = false
  }
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
