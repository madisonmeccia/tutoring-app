<template>
  <div>
    <h3>Sign In to Your Account</h3>
    <form @submit.prevent="handleSignin">
      <div class="tableRow">
        <label for="email">Email: &nbsp; </label>
        <input class="input" type="email" v-model="email" />
      </div>
      <div class="tableRow">
        <label for="password">Password: &nbsp; </label>
        <input class="input" type="password" v-model="password" />
      </div>
      <div>
        <button class="signInButton" type="submit">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../lib/supabaseClient";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const handleSignin = async () => {
      try {
        // Use the Supabase provided method to handle the signin
        const response = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value,
        });
        if (response.error) {
          throw response.error;
        } else {
          sessionStorage.setItem("currentUser", email.value);
        }

        if (response.data.user.user_metadata.role === "student") {
          router.push("/tutorsPage");
        } else {
          router.push("/tutorEdit");
        }
        $toast.success("Sign in complete!");
      } catch (error) {
        $toast.error(error.message);
        // alert(error.error_description || error.message);
      }
    };

    return {
      email,
      password,
      handleSignin,
    };
  },
};
</script>
<style scoped>
form .tableRow {
  display: table-row;
}
form .tableRow label,
input {
  display: table-cell;
  margin-top: 0.5rem;
  text-align: end;
}

form label {
  margin-inline-end: 0.25rem;
}
.signInButton {
  margin-top: 1rem;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  background-color: rgb(196, 147, 23);
}
h2 {
  font-family: "Times New Roman", Times, serif;
}
.input {
  background-color: rgb(233, 184, 62);
}
</style>
