<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const currentUser = ref(sessionStorage.getItem("currentUser"));

defineProps({
  msg: String,
});

const signOut = () => {
  sessionStorage.removeItem("currentUser");
  currentUser.value = undefined;
  router.push("/home");
};
</script>

<template>
  <h1>Gold Coast Tutoring</h1>

  <div class="card" v-show="!currentUser">
    <router-link to="/tutorRegister">
      <button class="button" type="button">Tutor register</button>
    </router-link>
    <router-link to="/studentRegister">
      <button class="button" type="button">Student register</button>
    </router-link>
    <router-link to="/signIn">
      <button class="button" type="button">Sign in</button>
    </router-link>
  </div>
  <div class="card" v-show="!!currentUser">
    <button class="button" type="button" @click="signOut">Sign Out!</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.button {
  color: seashell;
  background-color: black;
  margin-left: 2rem;
  margin-right: 2rem;
}
h1 {
  padding-bottom: 2rem;
}
</style>
