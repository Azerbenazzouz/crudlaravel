<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Historique</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Type</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in history" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.product }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.date }}</td>
              <td>
                <v-btn @click="showResult(item)" color="primary">View</v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-row v-if="selectedItem">
      <v-col cols="12">
        <h2>Result</h2>
        <component
          :is="resultComponent"
          :post="selectedItem.result"
          :description="selectedItem.result"
          :seo="selectedItem.result"
        ></component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import PostResult from '../components/PostResult.vue';
import DescriptionResult from '../components/DescriptionResult.vue';
import SEOResult from '../components/SEOResult.vue';

// Mock history data (replace with actual data later)
const history = ref([
  {
    id: 1,
    product: 'Product 1',
    type: 'Post',
    date: '2025-11-02',
    result: 'Generated post for Product 1',
  },
  {
    id: 2,
    product: 'Product 2',
    type: 'Description',
    date: '2025-11-01',
    result: 'Generated description for Product 2',
  },
  {
    id: 3,
    product: 'Product 1',
    type: 'SEO',
    date: '2025-10-31',
    result: 'Generated SEO data for Product 1',
  },
]);

const selectedItem = ref();

const showResult = (item) => {
  selectedItem.value = item;
};

const resultComponent = computed(() => {
    if (selectedItem.value) {
        switch (selectedItem.value.type) {
            case 'Post': return PostResult;
            case 'Description': return DescriptionResult;
            case 'SEO': return SEOResult;
            default: return null;
        }
    }
    return null;
});
</script>

<style scoped>
</style>
