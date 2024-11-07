<script setup>
import { ref } from "vue";
import { supabase } from "../lib/supabaseClient";
import { useToast } from "vue-toast-notification";
import { RESEND_API_KEY } from "../main";
import emailjs from "emailjs-com";
import { useRouter } from "vue-router";
import Signin from "./Signin.vue";
import TutorRegisterComponent from "./TutorRegisterComponent.vue";
const router = useRouter();
const currentUser = ref(sessionStorage.getItem("currentUser"));
const $toast = useToast();
const PUBLIC_EMAILJS_KEY = "9uKLSpab0x1_vWyWy";
const EMAILJS_SERVICEID = "service_qqraut2";
const EMAILJS_EMAIL_TEMPLATE_ID = "template_geg3bfg";

emailjs.init({
  publicKey: PUBLIC_EMAILJS_KEY,
  // Do not allow headless browsers
  blockHeadless: true,
  blockList: {
    // Block the suspended emails
    list: [],
    // The variable contains the email address
    // watchVariable: 'userEmail',
  },
  limitRate: {
    // Set the limit rate for the application
    id: "app",
    // Allow 1 request per 10s
    throttle: 10000,
  },
});
const searchField = ref("");
//load tutors get, JSON parse
const tutors = ref([]);
const currentStudent = ref();
// const search = async () => {
//   const { data } = await supabase
//     .from("tutors")
//     .select()
//     .contains("subjects", [searchField.value]);

//   tutors.value = data;
// };
const loadTutors = async () => {
  const studentSubjectResponse = await supabase
    .from("studentsandsubjects")
    .select()
    .eq("student_id", currentStudent.value.id);
  if (studentSubjectResponse.error) throw studentSubjectResponse.error;
  const subjectIds = studentSubjectResponse.data.map((ea) => ea.subject_id);
  const tutorSubjectResponse = await supabase
    .from("tutorsandsubjects")
    .select()
    .in("subject_id", subjectIds);
  if (tutorSubjectResponse.error) throw tutorSubjectResponse.error;
  const tutorIds = tutorSubjectResponse.data.map((ea) => ea.tutor_id);
  const { data, error } = await supabase
    .from("tutors")
    .select()
    .in("id", tutorIds);
  if (error) throw error;
  const subjectsResponse = await supabase
    .from("subjects")
    .select()
    .in("id", subjectIds);
  data.forEach((ea) => {
    const filteredSubjectIds = tutorSubjectResponse.data
      .filter((row) => row.tutor_id === ea.id)
      .map((x) => x.subject_id);
    const tutorSubjects = subjectsResponse.data.filter((subj) =>
      filteredSubjectIds.includes(subj.id)
    );
    ea.subjects = tutorSubjects;
  });

  //option to use join
  // const data = mockTutors();
  tutors.value = data;
};
const loadStudent = () => {
  return new Promise(async (resolve, reject) => {
    const userEmail = sessionStorage.getItem("currentUser");
    if (!userEmail) {
      // TODO Need to redirect to login
      router.push("/signIn");
      return;
    }
    const { data } = await supabase
      .from("students")
      .select()
      .eq("email", userEmail);
    currentStudent.value = data[0];
    resolve(data[0]);
  });
};
// const mockTutors = () => {
//   return [{
//     name: 'Daffy Duck',
//     subject: 'math',
//     email: 'daffy@wb.com'
//   }, {
//     name: 'Taylor Swift',
//     subject: 'music appreciation',
//     email: 'taytay@kelce.com'
//   }, {
//     name: 'Simone Biles',
//     subject: 'PE',
//     email: 'simone@usa.org'
//   }]
// };
try {
  const init = async () => {
    await loadStudent();
    loadTutors();
  };
  init();
} catch (error) {
  console.error(error);
}
const sendEmail = async (tutor) => {
  const userEmail = sessionStorage.getItem("currentUser");
  try {
    emailjs.send(
      EMAILJS_SERVICEID,
      EMAILJS_EMAIL_TEMPLATE_ID,
      {
        from_name: currentStudent.value.name,
        to_name: tutor.name,
        tutoring_subject: tutor.selectedSubject.title,
        reply_to: userEmail,
        to_email: tutor.email,
        from_email: userEmail,
      },
      PUBLIC_EMAILJS_KEY
    );
    $toast.success("The tutor has been contacted!!");
  } catch (error) {
    $toast.error("There was an error contacting the tutor");
    console.log({ error });
  }
};
</script>

<template>
  <div v-show="!currentUser">
    <div style="margin: 1rem 0; display: flex; justify-content: center">
      <img src="../assets/students-working.png" width="500" />
    </div>
    <div v-show="!currentUser">
      <!-- <StudentRegisterComponent></StudentRegisterComponent> -->
      <router-link to="/studentRegister">
        <button class="button" type="button">Register as a student</button>
      </router-link>
      <!-- <router-link to="/signIn">
        <button class="button" type="button">Sign in</button> -->
      <!-- </router-link> -->
    </div>
  </div>
  <div v-show="!!currentUser">
    <h1>Find a Tutor!</h1>
    <div style="margin: 1rem 0; display: flex; justify-content: center">
      <img src="../assets/girl-at-computer.png" width="500" />
    </div>
    <p>
      Search for a tutor that meets your needs and reach out to them via email.
    </p>
    <!-- <input placeholder="subject..." v-model="searchField" />
    <button @click="search">Search!</button> -->
    <div class="w3-row-padding">
      <div class="noTutorsMessage" v-show="!tutors || tutors.length === 0">
        No matching tutors were found.
      </div>
      <div v-for="tutor in tutors" class="card md:w-1/4 md:inline-block">
        <!-- <p><img height="200" width="200" v-bind:src="tutor.picture ?? ''" /></p> -->
        <p>Name: {{ tutor.name }}</p>
        <p v-show="!!tutor.bio">About Me: {{ tutor.bio }}</p>
        <p>
          Subjects:
          <select v-model="tutor.selectedSubject">
            <option disabled value="">Please select one</option>
            <option v-for="option in tutor.subjects" :value="option">
              {{ option.title }}
            </option>
          </select>
        </p>
        <p>
          <button :disabled="!tutor.selectedSubject" @click="sendEmail(tutor)">
            Contact tutor!
          </button>
        </p>
      </div>
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
