<template>
  <div v-if="post">
    <v-textarea :model-value="post" readonly></v-textarea>
    <v-btn @click="copyPost" color="primary">Copy</v-btn>
    <v-snackbar v-model="snackbar" :timeout="2000">
      Post copied to clipboard!
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  post: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['copied']);

const snackbar = ref(false);

const copyPost = () => {
  navigator.clipboard.writeText(props.post).then(() => {
    snackbar.value = true;
    emit('copied');
  });
};
</script>
