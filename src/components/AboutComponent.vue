<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

</script>

<template>
  <h1>About Us</h1>
  <div style="margin: 1rem 0; display: flex; justify-content: center;">
    <img src="../assets/thumbs-up-girl.png" width="600"/>
  </div>
  <p>
    We are a site that helps students find tutors. Sign up to find a tutor that
    matches your needs!
    
  </p>
</template>

<style scoped>
:root {
  width: 100%;
}
</style>
