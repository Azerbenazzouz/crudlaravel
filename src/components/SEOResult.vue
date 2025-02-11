<template>
  <div v-if="seo">
    <v-textarea :model-value="seo" readonly></v-textarea>
    <v-btn @click="copySEO" color="primary">Copy</v-btn>
    <v-snackbar v-model="snackbar" :timeout="2000">
      SEO data copied to clipboard!
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  seo: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['copied']);

const snackbar = ref(false);

const copySEO = () => {
  navigator.clipboard.writeText(props.seo).then(() => {
    snackbar.value = true;
    emit('copied');
  });
};
</script>
