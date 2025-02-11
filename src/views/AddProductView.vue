<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Add Product</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field label="Product Name" v-model="productName"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-textarea label="Description" v-model="description"></v-textarea>
      </v-col>
      <v-col cols="12">
        <v-text-field label="Price" type="number" v-model="price"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-file-input label="Images" v-model="images" multiple></v-file-input>
      </v-col>
      <v-col cols="12">
        <v-btn color="primary" @click="addProduct">Add</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const productName = ref('');
const description = ref('');
const price = ref();
const images = ref();

const addProduct = () => {
  console.log(productName.value, description.value, price.value, images.value);
};
</script>

<style scoped>

</style>
