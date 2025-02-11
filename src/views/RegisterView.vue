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
              Register
            </v-card-title>
          </div>

          <!-- Register Form -->
          <v-form @submit.prevent="register">
            <v-text-field
              v-model="name"
              label="Nom et Prénom"
              type="text"
              outlined
              dense
              prepend-inner-icon="mdi-account"
              class="mb-4"
              required
              :error-messages="nameErrors"
            ></v-text-field>

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
              v-model="birthday"
              label="Date de Naissance"
              type="date"
              outlined
              dense
              prepend-inner-icon="mdi-calendar"
              class="mb-4"
              required
              :error-messages="birthdayErrors"
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
              Vérifiez vos informations de connexion et réessayez.
            </v-alert>

            <!-- Submit Button -->
            <v-btn block color="primary" type="submit" :loading="loading" class="font-weight-bold">
              Register
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AuthRegister, RegisterModel } from '@/api/authentification'
import type { ResponseModel } from '@/models/Response'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const birthday = ref('')
const password = ref('')
const loading = ref(false)
const nameErrors = ref<string[]>([])
const emailErrors = ref<string[]>([])
const birthdayErrors = ref<string[]>([])
const passwordErrors = ref<string[]>([])
const error = ref<string | null>(null)
const router = useRouter()

const register = async () => {
  loading.value = true
  nameErrors.value = []
  emailErrors.value = []
  birthdayErrors.value = []
  passwordErrors.value = []
  error.value = null

  const data: RegisterModel = {
    name: name.value,
    email: email.value,
    birthday: birthday.value,
    password: password.value,
  }

  try {
    const response = await AuthRegister(data)

    if (response.status) {
      router.push('/login')
    } else {
      if (response.errors) {
        nameErrors.value = response.errors.name || []
        emailErrors.value = response.errors.email || []
        birthdayErrors.value = response.errors.birthday || []
        passwordErrors.value = response.errors.password || []
      }
      error.value = response.message
    }
  } catch (error) {
    console.error('An error occurred:', error)
    error.value = 'Une erreur inattendue est survenue.'
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
