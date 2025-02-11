<template>
  <div v-if="description">
    <v-textarea :model-value="description" readonly></v-textarea>
    <v-btn @click="copyDescription" color="primary">Copy</v-btn>
    <v-snackbar v-model="snackbar" :timeout="2000">
      Description copied to clipboard!
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  description: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['copied']);

const snackbar = ref(false);

const copyDescription = () => {
  navigator.clipboard.writeText(props.description).then(() => {
    snackbar.value = true;
    emit('copied');
  });
};
</script>
