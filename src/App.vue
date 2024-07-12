<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const currentUser = ref(sessionStorage.getItem("currentUser"));
router.afterEach(() => {
  currentUser.value = sessionStorage.getItem("currentUser");
});
const signOut = () => {
  currentUser.value = undefined;
  sessionStorage.removeItem("currentUser");
  router.push("/home");
};
</script>

<template>
  <div class="routers">
    <router-link to="/about">about</router-link>
    <router-link to="/home">home</router-link>
    <a @click="signOut" v-show="!!currentUser">sign out</a>
  </div>
  <router-view> </router-view>
</template>

<style scoped>
.routers {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
