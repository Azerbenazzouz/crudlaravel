<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Add Product</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Product Name"
          v-model="productName"
          :error-messages="productNameErrors"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-textarea
          label="Description"
          v-model="description"
          :error-messages="descriptionErrors"
        ></v-textarea>
      </v-col>
      <v-col cols="12">
        <v-text-field
          label="Price"
          type="number"
          v-model="price"
          :error-messages="priceErrors"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-file-input
          label="Image"
          v-model="image"
          accept="image/png, image/jpeg"
          :error-messages="imageErrors"
        ></v-file-input>
      </v-col>
      <v-col cols="12">
        <v-alert v-if="error" type="error" dense class="mb-4">
          {{ error }}
        </v-alert>
        <v-alert v-if="success" type="success" dense class="mb-4">
          Produit ajouté avec succès!
        </v-alert>
        <v-btn :loading="loading" color="primary" @click="addProduct">
          Ajouter le produit
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { AddProduct } from '@/api/product'
import type { Product } from '@/models/Product'
import { ref } from 'vue'

const productName = ref('')
const description = ref('')
const price = ref<number>(0)
const image = ref<File | undefined>()
const loading = ref(false)
const success = ref(false)

const productNameErrors = ref<string[]>([])
const descriptionErrors = ref<string[]>([])
const priceErrors = ref<string[]>([])
const imageErrors = ref<string[]>([])
const error = ref<string | null>(null)

const addProduct = async () => {
  loading.value = true
  success.value = false
  productNameErrors.value = []
  descriptionErrors.value = []
  priceErrors.value = []
  imageErrors.value = []
  error.value = null

  const product: Product = {
    name: productName.value,
    description: description.value,
    price: price.value,
    image: image.value ? image.value : null,
  }

  try {
    const res = await AddProduct(product)
    if (res.status) {
      success.value = true
      productName.value = ''
      description.value = ''
      price.value = 0
      image.value = undefined
    } else {
      if (res.errors) {
        productNameErrors.value = res.errors.name || []
        descriptionErrors.value = res.errors.description || []
        priceErrors.value = res.errors.price || []
        imageErrors.value = res.errors.image || []
      }
      error.value = res.message
    }
  } catch (err) {
    console.error(err)
    error.value = 'Une erreur est survenue.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>

</style>
