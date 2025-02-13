<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Generate SEO</h1>
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
          v-model="additionalInfo"
          :error-messages="productAdditionalInfoErrors"
          required
        ></v-textarea>
      </v-col>
      <v-col cols="12">
        <v-btn color="primary" @click="generateSEO" :loading="loading">
          Generate
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <SEOResult :seo="generatedSEO" @copied="onSEOCopied" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SEOResult from '../components/SEOResult.vue';
import type { Product } from '@/models/Product';
import { GetProducts } from '@/api/product';
import type { ResponseModel } from '@/models/Response';
import {
  GenerateSEOContent,
  type GenerateRequestModel,
  type GenerateResponseModel,
} from '@/api/generator';

const products = ref<Product[]>([]);

const selectedProduct = ref();
const additionalInfo = ref('');
const generatedSEO = ref('');
const loading = ref(false);
const productNameErrors = ref<string[]>([]);
const productAdditionalInfoErrors = ref<string[]>([]);

onMounted(async () => {
  await GetProducts().then(
    (data: ResponseModel<Product[]> | ResponseModel<null>) => {
      if (data.data) {
        products.value = data.data;
      } else {
        console.error(data.message);
      }
    }
  );
});

const generateSEO = async () => {
  if (!selectedProduct.value) {
    productNameErrors.value = ['Product is required'];
    return;
  } else {
    productNameErrors.value = [];
  }

  if (!additionalInfo.value) {
    productAdditionalInfoErrors.value = ['Additional information is required'];
    return;
  } else {
    productAdditionalInfoErrors.value = [];
  }

  loading.value = true;
  const request = {
    product_id: Number(selectedProduct.value),
    additional_information: additionalInfo.value ?? '',
  } as GenerateRequestModel;

  await GenerateSEOContent(request)
    .then((data: ResponseModel<GenerateResponseModel> | ResponseModel<null>) => {
      if (data.data) {
        generatedSEO.value = data.data.content;
      } else {
        console.error(data.message);
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const onSEOCopied = () => {
  console.log('SEO copied!');
};
</script>

<style scoped></style>
