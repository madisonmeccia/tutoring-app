<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});
</script>

<template>
  <h1>About Us</h1>
  <div style="margin: 1rem 0; display: flex; justify-content: center">
    <img src="../assets/thumbs-up-girl.png" width="600" />
  </div>
  <p>
    Students for Students Inc., was created by Madison, a High School Junior,
    who had worked as a volunteer peer tutor on the Schoolhouse platform during
    her Sophomore year. Understanding firsthand how a challenging workload which
    may include multiple advanced placement courses, can easily cause a student
    to feel overwhelmed and a bit anxious, Madison decided to create a safe,
    welcoming and collaborative peer learning environment for high school
    students. Students for Students Inc.'s objective is to connect you with Peer
    Tutors in your school that have been in your shoes, have taken the same or
    similar courses, have done well in the courses (with at least an A- average)
    and genuinely want to help you learn the material. The goal is to create a
    friendly, safe and accessible online community that empowers students to
    learn and build peer relationships, to help each other succeed academically
    and beyond. Students for Students Inc., believes in helping students take
    advantage of the most powerful resources at their disposal- their fellow
    classmates.
    <router-link to="/home">Sign up</router-link> to find a tutor that matches
    your needs!
  </p>
</template>

<style scoped>
:root {
  width: 100%;
}
h1 {
  color: lightgray;
}
</style>
