<script setup>
import { ref } from "vue";
import { supabase } from "../lib/supabaseClient";
import { RESEND_API_KEY } from "../main";

const searchField = ref("");
//load tutors get, JSON parse
const tutors = ref([]);
const search = async () => {
  const { data } = await supabase
    .from("tutors")
    .select()
    .eq("subject", searchField.value);
  tutors.value = data;
};
const loadTutors = async () => {
  const { data } = await supabase.from("tutors").select();
  tutors.value = data;
};
loadTutors();
const sendEmail = () => {
  alert(RESEND_API_KEY);
};
</script>

<template>
  <h1>Meet our tutors!</h1>
  <p>
    search for a tutor that meets your needs and reach out to them via email
  </p>
  <input placeholder="subject..." v-model="searchField" />
  <button @click="search">search!</button>
  <div class="w3-row-padding">
    <div class="noTutorsMessage" v-show="tutors.length === 0">
      No matching tutors were found
    </div>
    <div v-for="tutor in tutors" class="card w3-third">
      <p><img height="200" width="200" v-bind:src="tutor.picture ?? ''" /></p>
      <p><strong>name:</strong> {{ tutor.name }}</p>
      <p>subject: {{ tutor.subject }}</p>
      <p>
        <button @click="sendEmail(tutor.email)">contact tutor!</button>
      </p>
    </div>
  </div>
</template>

<style scoped>
.noTutorsMessage {
  width: 100%;
  height: 10rem;
  padding-top: 5rem;
  font-weight: bold;
}
</style>
