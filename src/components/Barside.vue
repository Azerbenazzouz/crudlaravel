<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.to"
        :value="item.title"
        :color="item.to === $route.path ? 'primary' : ''"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
defineOptions({
  name: "BarsideMenu"
});

const menuItems = [
  {
    title: 'Add Product',
    icon: 'mdi-package-variant',
    to: '/dashboard/add-product',
  },
  {
    title: 'Products',
    icon: 'mdi-package-variant',
   to: '/dashboard/products',
  },
  {
    title: 'Generate Post',
    icon: 'mdi-post',
    to: '/dashboard/generate-post',
  },
  {
    title: 'Generate Description',
    icon: 'mdi-text',
    to: '/dashboard/generate-description',
  },
  {
    title: 'Generate SEO',
    icon: 'mdi-search-web',
    to: '/dashboard/generate-seo',
  },
  {
    title: 'Historique',
    icon: 'mdi-history',
    to: '/dashboard/historique',
  },
]
</script>

<style scoped>
/* Les styles personnalisés ne sont plus nécessaires car nous utilisons Vuetify */
</style>
