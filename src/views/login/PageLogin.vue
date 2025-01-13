<template>
  <v-container
    class="d-flex flex-column align-center justify-center"
    style="height: 100vh"
  >
    <v-card class="pa-5" max-width="400">
      <v-tabs v-model="tab" align-tabs="center">
        <v-tab :value="0">Авторизация</v-tab>
        <v-tab :value="1">Сброс пароля</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab" class="pt-4">
        <v-tabs-window-item>
          <v-form ref="formLoginRef" fast-fail @submit.prevent="onLogin">
            <v-text-field
              v-model="formLogin.login"
              :rules="rules"
              label="Логин"
            ></v-text-field>
            <v-text-field
              v-model="formLogin.password"
              :rules="rules"
              label="Пароль"
              type="password"
            ></v-text-field>
            <v-btn color="primary" class="mt-2" type="submit" block>
              Войти
            </v-btn>
          </v-form>
          <v-alert
            v-if="showErrorAlert"
            text="Неверный логин или пароль"
            type="warning"
            class="mt-2"
          ></v-alert>
        </v-tabs-window-item>

        <v-tabs-window-item>
          <v-form
            ref="formLoginResetPassword"
            fast-fail
            @submit.prevent="onResetPassword"
          >
            <v-text-field
              v-model="formResetPassword.password"
              :rules="rules"
              label="Новый пароль"
              type="password"
            ></v-text-field>
            <v-btn color="primary" class="mt-2" type="submit" block>
              Сбросить
            </v-btn>
          </v-form>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>

    <v-dialog v-model="showResetPasswordDialog" max-width="400">
      <v-card>
        <v-card-title>Пароль сброшен</v-card-title>
        <v-card-actions>
          <v-btn color="primary" @click="showResetPasswordDialog = false">
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { VForm } from "vuetify/components";
import { useUserStore } from "../../stores/user";

const userStore = useUserStore();
const router = useRouter();
const tab = ref(0);
const formLoginRef = ref<VForm | null>(null);
const formLogin = ref({
  login: "",
  password: "",
});
const formLoginResetPassword = ref<VForm | null>(null);
const formResetPassword = ref({
  password: "",
});
const rules = [
  (value: string) => {
    if (value) return true;

    return "The field is required";
  },
];
const showErrorAlert = ref(false);
const showResetPasswordDialog = ref(false);

const onLogin = async () => {
  if (!formLoginRef.value) return;
  const { valid } = await formLoginRef.value?.validate();
  if (!valid) return;

  if (
    formLogin.value.login !== userStore.login ||
    formLogin.value.password !== userStore.password
  ) {
    showErrorAlert.value = true;
    return;
  }
  userStore.auth = true;
  router.push({ name: "PageDashboard" });
};

const onResetPassword = async () => {
  if (!formLoginResetPassword.value) return;
  const { valid } = await formLoginResetPassword.value?.validate();
  if (!valid) return;

  userStore.password = formResetPassword.value.password;
  showResetPasswordDialog.value = true;
  tab.value = 0;
};
</script>

<style scoped></style>
