<script setup>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { ref, toRefs, defineProps } from "vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { supabase } from "../lib/supabaseClient";

const props = defineProps({
  edit: String,
});
const { edit } = toRefs(props);
const name = ref("");
const password = ref("");
const confirmPassword = ref("");
const emailAddress = ref("");
const subjects = ref([]);
const bio = ref("");
const picture = ref("");
const $toast = useToast();
const options = ref([]);
const title = ref("Add Tutor!");
const buttonTitle = ref("Register");

const isEditing = () => {
  return !!edit.value;
};

const loadSubjects = async () => {
  const { data } = await supabase.from("subjects").select();
  options.value = data;
};
const loadUser = async () => {
  if (!isEditing()) {
    return;
  }
  const userEmail = sessionStorage.getItem("currentUser");
  const { data } = await supabase
    .from("tutors")
    .select()
    .eq("email", userEmail);
  const user = data[0];
  name.value = user.name;
  emailAddress.value = user.email;
  // password.value = user.password;
  picture.value = user.picture;
  subjects.value = user.subjects;
  bio.value = user.bio;
};
const init = () => {
  loadSubjects();
  if (isEditing()) {
    title.value = "Update Tutor!";
    buttonTitle.value = "Update Tutor!";
  }
  loadUser();
};
init();
const checkPassword = () => {
  if (isEditing()) {
    return;
  }
  if (password.value === confirmPassword.value) {
    $toast.success("passwords match!");
  } else {
    $toast.error("passwords do not match!");
  }
};

const isFormInvalid = () => {
  return (
    name.value.trim() == "" ||
    emailAddress.value.trim() == "" ||
    password.value.trim() == "" ||
    confirmPassword.value.trim() == "" ||
    //confirmPassword.value.trim() == "" ||
    subjects.value == [] ||
    bio.value.trim() == ""
  );
};

const addPicture = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    //const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    // store file
    //localStorage.setItem('wallpaper', base64String);
    // display image
    //  let img = document.getElementById("image");
    picture.value = reader.result;
  };
  reader.readAsDataURL(file);
};
const addTutor = async () => {
  try {
    //loading.value = true;
    const tutor = {
      name: name.value,
      email: emailAddress.value,
      subjects: subjects.value,
      bio: bio.value,
      picture: picture.value,
    };
    const signupResponse = await supabase.auth.signUp({
      email: emailAddress.value,
      password: password.value,
      options: { data: { role: "tutor" } },
    });
    if (signupResponse.error) throw signupResponse.error;
    const { error } = await supabase.from("tutors").insert(tutor);

    if (error) throw error;
    $toast.success(`Added tutor ${tutor.name}`);
  } catch (error) {
    $toast.error(error.message);
  } finally {
  }
};
const updateTutor = async () => {
  try {
    //loading.value = true;
    const tutor = {
      name: name.value,
      subjects: subjects.value,
      bio: bio.value,
      picture: picture.value,
    };
    const { error } = await supabase
      .from("tutors")
      .update(tutor)
      .eq("email", emailAddress.value);

    if (error) throw error;
    $toast.success(`Updated tutor ${tutor.name}`);
  } catch (error) {
    $toast.error(error.message);
  } finally {
  }
};

const submitChanges = () => {
  if (isEditing()) {
    updateTutor();
  } else {
    addTutor();
  }
};
</script>

<template>
  <h1>{{ title }}</h1>

  <div class="card">
    <form v-on:submit.prevent="submitChanges">
      <div>Enter Information</div>
      <div class="fields">
        <p class="required">Name:</p>
        <div class="field">
          <input type="text" required v-model="name" />
        </div>

        <p class="required">Email Address:</p>
        <div class="field">
          <input
            type="email"
            :disabled="isEditing()"
            required
            v-model="emailAddress"
          />
        </div>

        <p class="required">Password:</p>
        <div class="field">
          <input
            type="password"
            :disabled="isEditing()"
            :required="!isEditing()"
            v-model="password"
          />
        </div>

        <p class="required">Confirm password:</p>
        <div class="field">
          <input
            type="password"
            :disabled="isEditing()"
            v-on:change="checkPassword"
            :required="!isEditing()"
            v-model="confirmPassword"
          />
        </div>

        <!-- <p>Picture:</p>
        <div class="field">
          <input
            type="file"
            v-on:change="addPicture($event)"
            placeholder="image url"
          />
        </div> -->

        <p class="required">Subjects:</p>
        <div class="field">
          <multiselect v-model="subjects" :options="options"></multiselect>
          <!-- <select v-model="subject">
            <option v-for="option in options" :value="option.name">
              {{ option.title }}
            </option>
          </select> -->
        </div>

        <p>Bio:</p>
        <div class="field">
          <textarea v-model="bio" placeholder="tell us about yourself!" />
        </div>
      </div>
      <button type="submit" :disable="isFormInvalid()">
        {{ buttonTitle }}
      </button>
    </form>
  </div>
</template>

<style scoped>
/* .required::after {
  content: " *";
  color: red;
} */

.read-the-docs {
  color: #888;
}

</style>
