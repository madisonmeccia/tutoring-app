<script setup>
import { ref } from "vue";

const questionGroups = ref([{
  name: 'General',
  questions: [{
  q: "What makes Student for Students, Inc., different?",
  a: `Students for Students,
    Inc., connects you with Peer Tutors in your school who have taken your
    classes and obtained a grade of at least an A- or higher and who want to
    help you learn. Think of it as an online community of fellow students who
    want to help you succeed.`,
}]}, {
  name: 'Students',
  questions: [{
  q: "Who are the Peer Tutors?",
  a: `Peer Tutors
    are students in your own school who have achieved exceptional academic
    performance in the subject area they are tutoring.`,
}, {
  q: 'How do I get started?',
  a: `To get started simply click the “Find a Tutor” link, input your contact
    information, select the subject and add in any additional information to
    find a tutor that best matches your needs. Then just request to schedule a
    session! All tutoring sessions will be conducted using online conferencing
    software; when your tutor emails you to confirm a session, you can discuss
    which conferencing software will work best for both of you.`
}, {
  q: 'How can I prepare for an upcoming session?',
  a: `As soon as you receive confirmation of
    your session, send your Peer Tutor a message about what you would like to
    specifically cover and include any relevant materials. Also, make sure that
    you have access to a laptop or desktop and high-speed Internet.`
}, {
  q: 'What happens when I join the online session?',
  a: `Upon joining the online session,
    you can use video, audio or text chat to review what you need help with
    (however, it is best to inform the tutor of your needs prior to the session so that the
    tutor has time to prepare).`
}, {
  q: 'What happens if I lose Internet connection during a session?',
  a: `If you lose your Internet connection during a session,
    please message your Peer Tutor as soon as possible and rejoin the session as
    soon as your connection returns.`
}

]}, {
  name: 'Tutors',
  questions: [{
  q: "Why become a peer tutor?",
  a: `Becoming a Peer Tutor gives you the opportunity to help other students in
    your school community achieve their goals, both academically and beyond and
    you will receive service credits from your school for the hour(s) you have
    tutored. You can also add your tutoring experience to your résumé to show
    your selfless contribution in your school community to colleges and
    potential employers to identify yourself as a student who is really making a
    difference.`,
}, {
  q: 'Is there a minimum time commitment?',
  a: `No, there is no minimum
    time commitment; you make your own schedule.`
}, {
  q: 'If I become a Peer Tutor, can I still get help from other Peer Tutors?',
  a: `Absolutely, everyone can use a
    little extra help, which is why Peer Tutors can tutor in one subject and be
    tutored in another subject. Maybe one of your students will end up tutoring
    you.`
}, {
  q: 'How can I prepare for an upcoming session?',
  a: `Before the tutoring
    session, contact your student to inquire about what specific topics they
    would like to cover so that you can review/prepare prior to the session, if
    necessary. And make sure that you have access to a laptop or desktop and
    high-speed Internet.`
}, {
  q: 'Are there any requirements for tutoring?',
  a: `Yes, you
    must be a current registered student and must have obtained a grade of at
    least an A- in the subject area you would like to tutor.`
}

]}]);

const PLUS_SYMBOL = "+";
const MINUS_SYMBOL = "-";

const toggleElement = (id) => {
  const icon = document.getElementById(id + 'icon');
  const answer = document.getElementById(id);
  if (answer.style.display == 'none') {
    answer.style.display = '';
    icon.innerHTML = MINUS_SYMBOL;
  }
  else {
    answer.style.display = 'none';
    icon.innerHTML = PLUS_SYMBOL;
  }
};
</script>

<template>
  <h1>FAQs</h1>
  <div style="margin: 1rem 0; display: flex; justify-content: center">
    <img src="../assets/faqs.png" width="300" />
  </div>
  <div style="text-align: start" v-for="(group, groupIndex) in questionGroups">
    <h2>{{ group.name }}</h2>
    <div v-for="(question, questionIndex) in group.questions">
      <p style="cursor: pointer">
        <div @click="toggleElement('q' + groupIndex + questionIndex)" style="display: flex; flex-direction: row;">
          <div :id="'q' + groupIndex + questionIndex + 'icon'" class="inline text-center min-w-4 text-white font-extrabold text-3xl me-2">{{ PLUS_SYMBOL }}</div>
          <div style="align-self: center">Q: {{ question.q }}</div>
        </div>
      </p>
      <div :id="'q' + groupIndex + questionIndex" style="display:none;" class="border-solid border-2 border-white p-6">
        A: {{ question.a }}
      </div>

    </div>
  
  </div>
</template>

<style scoped></style>
