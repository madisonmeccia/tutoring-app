<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

</script>

<template>
  <h1>FAQs</h1>
  <div style="margin: 1rem 0; display: flex; justify-content: center;">
    <img src="../assets/faqs.png" width="300"/>
  </div>
</template>

<style scoped></style>
