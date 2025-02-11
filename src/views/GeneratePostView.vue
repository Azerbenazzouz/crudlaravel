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
import { ref } from 'vue';
import PostResult from '../components/PostResult.vue';

// Mock product list (replace with actual data later)
const products = ref([
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  { id: 3, name: 'Product 3' },
]);

const selectedProduct = ref();
const additionalInfo = ref('');
const generatedPost = ref('');

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
