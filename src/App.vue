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
    <router-link to="/about" class="router">About Us</router-link>
    <router-link to="/findTutor" class="router">Find a Tutor</router-link>
    <router-link to="/becomeTutor" class="router">Be a Tutor</router-link>
    <router-link to="/faq" class="router">FAQs</router-link>
    <router-link to="/home" class="router">Home</router-link>
    <router-link to="/signIn" class="router" v-show="!currentUser"
      >Sign In</router-link
    >
    <a @click="signOut" v-show="!!currentUser">Sign Out</a>
  </div>
  <router-view></router-view>
</template>

<style scoped>
.routers {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.router {
  flex: 1;
}

.grow-2 {
  flex-grow: 2;
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
