<template>
  <v-app>
    <SideBar />
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col>
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import SideBar from '@/components/Barside.vue'
</script>

<style scoped></style>
