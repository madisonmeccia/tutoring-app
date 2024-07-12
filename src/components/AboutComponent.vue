<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <h1>about us</h1>
  <p>
    We are a site that helps students find tutors. Sign up to find a tutor that
    matches your needs!
  </p>
</template>

<style scoped></style>
