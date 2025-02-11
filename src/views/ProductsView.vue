<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Products</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="product in products" :key="product.id">
        <v-card>
          <v-img
            :src="product.image"
            height="200px"
            cover
          ></v-img>
          <v-card-title>
            {{ product.name }}
          </v-card-title>
          <v-card-subtitle>
            {{ product.price }} $
          </v-card-subtitle>
          <v-card-text>
            {{ product.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Mock product data (replace with actual data later)
const products = ref([
  { id: 1, name: 'Product 1', description: 'Description 1', price: 10, image: 'https://via.placeholder.com/300x200?text=Product+1' },
  { id: 2, name: 'Product 2', description: 'Description 2', price: 20, image: 'https://via.placeholder.com/300x200?text=Product+2' },
  { id: 3, name: 'Product 3', description: 'Description 3', price: 30, image: 'https://via.placeholder.com/300x200?text=Product+3' },
]);
</script>
