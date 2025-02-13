<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Generate Post</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-select
          label="Select Product"
          :items="products"
          item-title="name"
          item-value="id"
          v-model="selectedProduct"
          :error-messages="productNameErrors"
          required
        ></v-select>
      </v-col>
      <v-col cols="12">
        <v-textarea
        label="Additional Information"
        :error-messages="productAdditionalInfoErrors"
        v-model="additionalInfo"></v-textarea>
      </v-col>
      <v-col cols="12">
        <v-btn color="primary" @click="generatePost" :loading="loading"> Generate </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <PostResult :post="generatedPost" @copied="onPostCopied" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PostResult from '../components/PostResult.vue'
import type { Product } from '@/models/Product'
import { GetProducts } from '@/api/product'
import type { ResponseModel } from '@/models/Response'
import {
  GenerateSocialMediaPost,
  type GenerateRequestModel,
  type GenerateResponseModel,
} from '@/api/generator'

// Liste des produits (à remplacer par les données réelles ultérieurement)
const products = ref<Product[]>([])

const selectedProduct = ref()
const additionalInfo = ref('')
const generatedPost = ref('')
const loading = ref(false) // Variable de chargement
const productNameErrors = ref<string[]>([]) // Erreurs de validation
const productAdditionalInfoErrors = ref<string[]>([]) // Erreurs de validation
onMounted(async () => {
  await GetProducts().then((data: ResponseModel<Product[]> | ResponseModel<null>) => {
    if (data.data) {
      products.value = data.data
    } else {
      console.error(data.message)
    }
  })
})

const generatePost = async () => {
  if (!selectedProduct.value) {
    productNameErrors.value = ['Product is required']
    return
  } else {
    productNameErrors.value = []
  }

  if (!additionalInfo.value) {
      console.error('Les informations supplémentaires sont requises');
      productAdditionalInfoErrors.value = ['Additional information is required'];
      return;
  } else {
    productAdditionalInfoErrors.value = [];
  }

  loading.value = true
  const request = {
    product_id: Number(selectedProduct.value),
    additional_information: additionalInfo.value ?? '',
  } as GenerateRequestModel

  await GenerateSocialMediaPost(request)
    .then((data: ResponseModel<GenerateResponseModel> | ResponseModel<null>) => {
      if (data.data) {
        generatedPost.value = data.data.content
      } else {
        console.error(data.message)
      }
    })
    .finally(() => {
      loading.value = false
    })
}

const onPostCopied = () => {
  console.log('Post copied to clipboard')
}
</script>

<style scoped></style>
