<script setup>
import { supabase } from "../lib/supabaseClient";
import { ref } from "vue";
const options = ref([]);

const loadSubjects = async () => {
  const { data } = await supabase.from("subjects").select();
  options.value = data;
};
loadSubjects();
</script>

<template>
  <div class="field">
    <select v-model="subject">
      <option v-for="option in options" :value="option.name">
        {{ option.title }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
