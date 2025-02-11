<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Generate Description</h1>
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
        <v-btn color="primary" @click="generateDescription">
          Generate
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <DescriptionResult
          :description="generatedDescription"
          @copied="onDescriptionCopied"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DescriptionResult from '../components/DescriptionResult.vue';

// Mock product list (replace with actual data later)
const products = ref([
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  { id: 3, name: 'Product 3' },
]);

const selectedProduct = ref();
const additionalInfo = ref('');
const generatedDescription = ref('');

const generateDescription = () => {
  // Simulate description generation (replace with actual logic later)
  generatedDescription.value = `Description for ${
    products.value.find((p) => p.id === selectedProduct.value)?.name
  }: ${additionalInfo.value}`;
};

const onDescriptionCopied = () => {
  console.log('Description copied!');
};
</script>

<style scoped>
</style>
