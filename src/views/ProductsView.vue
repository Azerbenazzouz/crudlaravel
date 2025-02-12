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
            :src="resolveImage(product.image) ?? ''"
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
import { GetProducts } from '@/api/product';
import type { Product } from '@/models/Product';
import type { ResponseModel } from '@/models/Response';
import { onMounted, ref } from 'vue';

const products = ref<Product[]>([]);

// utility function to resolve image source
function resolveImage(image: string | File | null) {
  if (!image) return '';
  return typeof image === 'string' ? image : URL.createObjectURL(image);
}

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

</script>
