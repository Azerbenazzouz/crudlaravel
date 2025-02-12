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
        ></v-select>
      </v-col>
      <v-col cols="12">
        <v-textarea
          label="Additional Information"
          v-model="additionalInfo"
        ></v-textarea>
      </v-col>
      <v-col cols="12">
        <v-btn color="primary" @click="generatePost">Generate</v-btn>
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
import { onMounted, ref } from 'vue';
import PostResult from '../components/PostResult.vue';
import type { Product } from '@/models/Product';
import { GetProducts } from '@/api/product';
import type { ResponseModel } from '@/models/Response';

// Mock product list (replace with actual data later)
const products = ref<Product[]>([]);

const selectedProduct = ref();
const additionalInfo = ref('');
const generatedPost = ref('');

onMounted(async() => {
  await GetProducts()
  .then((data : ResponseModel<Product[]> | ResponseModel<null>) => {
    if(data.data) {
      products.value = data.data;
      console.log(data);
    }else {
      console.error(data.message);
    }
  });
});


const generatePost = () => {
  // Simulate post generation (replace with actual logic later)
  generatedPost.value = `Post for ${
    products.value.find((p) => p.id === selectedProduct.value)?.name
  }: ${additionalInfo.value}`;
};

const onPostCopied = () => {
  console.log('Post copied!');
};
</script>

<style scoped>
</style>
