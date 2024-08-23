<script setup>
import { ref } from "vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "vue-router";

const name = ref("");
const password = ref("");
const confirmPassword = ref("");
const emailAddress = ref("");
const subject = ref("");
const goals = ref("");
const options = ref([]);
const $toast = useToast();
const router = useRouter();
const loadSubjects = async () => {
  const { data } = await supabase.from("subjects").select();
  options.value = data;
};
loadSubjects();
const checkPassword = () => {
  if (password.value === confirmPassword.value) {
    $toast.success("passwords match!");
  } else if (password.value !== confirmPassword.value) {
    $toast.error("passwords do not match!");
  }
};
const isFormInvalid = () => {
  return (
    name.value.trim() == "" ||
    emailAddress.value.trim() == "" ||
    password.value.trim() == "" ||
    confirmPassword.value.trim() == "" ||
    subject.value.trim() == ""
  );
};
const addStudent = async () => {
  console.log(name.value);
  const student = {
    name: name.value,
    email: emailAddress.value,
    subject: subject.value,
    goals: goals.value,
  };
  const signupResponse = await supabase.auth.signUp({
    email: emailAddress.value,
    password: password.value,
    options: { data: { role: "student" } },
  });
  if (signupResponse.error) throw signupResponse.error;
  const { error } = await supabase.from("students").insert(student);

  if (error) throw error;

  $toast.success(`Added student ${student.name}`);
  setTimeout(() => {
    router.push("/signIn");
  }, 1500);
};
</script>

<template>
  <h1>Register as a Student</h1>

  <div class="card">
    <form class="p-2" v-on:submit.prevent="addStudent">
      <p>Enter Information</p>
      <div class="fields">
        <p>Name:</p>
        <div class="field"><input type="text" required v-model="name" /></div>
        <p>Email address:</p>
        <div class="field">
          <input type="email" required v-model="emailAddress" />
        </div>

        <p>Password:</p>
        <div class="field">
          <input type="password" required v-model="password" />
        </div>
        <p>Confirm password:</p>
        <div class="field">
          <input
            type="password"
            v-on:change="checkPassword"
            required
            v-model="confirmPassword"
          />
        </div>

        <p>Subject:</p>
        <div class="field">
          <select v-model="subject">
            <option v-for="option in options" :value="option.name">
              {{ option.title }}
            </option>
          </select>
        </div>

        <p>Goals:</p>
        <div class="field">
          <textarea
            v-model="goals"
            placeholder="What do you want to accomplish?"
          />
        </div>
      </div>
      <button type="submit" :disabled="isFormInvalid()">Register</button>
    </form>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.field select,
.field textarea,
.field input {
  width: 100%;
}
</style>
