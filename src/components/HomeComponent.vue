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
  <img src="../assets/full-front-page-minus-banner.png" width="1200" class="mt-0" alt="mainPageImage" usemap="#examplemap">

  <map name="examplemap">
    <area shape="rect" coords="80,1385,500,1435" href="/becomeTutor" alt="Be a Tutor">
    <area shape="rect" coords="80,1200,500,1250" href="/findTutor" alt="Find a Tutor">
  </map>

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

h1 {
  padding-bottom: 2rem;
}
</style>
