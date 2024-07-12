import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ToastPlugin from "vue-toast-notification";
import { createRouter, createWebHistory } from "vue-router";
import AboutComponent from "./components/AboutComponent.vue";
import HomeComponent from "./components/HomeComponent.vue";
import TutorRegisterComponent from "./components/TutorRegisterComponent.vue";
import StudentRegisterComponent from "./components/StudentRegisterComponent.vue";
import TutorsPageComponent from "./components/TutorsPageComponent.vue";
import Signin from "./components/Signin.vue";
export const RESEND_API_KEY = "re_h2sG5VJj_M862dVAZQ8dm7kGtizjwABxU";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/about", component: AboutComponent },
    { path: "/home", component: HomeComponent },
    { path: "/tutorRegister", component: TutorRegisterComponent },
    {
      path: "/tutorEdit",
      component: TutorRegisterComponent,
      props: { edit: "true" },
    },
    { path: "/studentRegister", component: StudentRegisterComponent },
    { path: "/tutorsPage", component: TutorsPageComponent },
    { path: "/signIn", component: Signin },
  ],
});
const app = createApp(App);

app.use(router);
app.use(ToastPlugin);

app.mount("#app");
