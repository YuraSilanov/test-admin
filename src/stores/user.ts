import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const login = ref("user");
  const password = ref("password");
  const auth = ref(false);

  return {
    login,
    password,
    auth,
  };
});
