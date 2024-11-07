<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const currentUser = ref(sessionStorage.getItem("currentUser"));
if (!!currentUser.value) {
  router.push("/tutorsPage");
}
</script>

<template>
  <div class="card">
    <router-link to="/studentRegister">
      <button class="button" type="button">Student register</button>
    </router-link>
    <router-link to="/signIn">
      <button class="button" type="button">Already Registered? Sign In</button>
    </router-link>
  </div>
</template>

<style scoped>
.card {
  margin-top: 1rem;
  width: 70%;
}

h1 {
  padding-bottom: 2rem;
}
</style>
