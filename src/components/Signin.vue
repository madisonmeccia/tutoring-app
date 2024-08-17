<template>
  <div>
    <h2>Sign In to Your Account</h2>
    <form @submit.prevent="handleSignin">
      <div class="tableRow">
        <label for="email" class="required font-bold">Email:&nbsp;</label>
        <input class="input" type="email" v-model="email" />
      </div>
      <div class="tableRow">
        <label for="password" class="required font-bold">Password:&nbsp;</label>
        <input class="input" type="password" v-model="password" />
      </div>
      <div>
        <button v-class="buttonClasses" type="submit">Sign in</button>
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
const buttonClasses = "py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 focus:outline-none focus:border-blue-600 focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:text-blue-500 dark:focus:border-blue-600";

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
form {
  display: inline-flex;
  flex-direction: column;
  margin: 1rem 0;
  gap: 0.5rem;
}
form .tableRow {
  display: table-row;
}
form .tableRow label,
input {
  display: table-cell;
  margin-top: 0.5rem;
}

.signInButton {
  margin-top: 1rem;
}
</style>
