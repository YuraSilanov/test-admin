import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import "vuetify/dist/vuetify.css";
import "./style.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(createPinia());
app.use(router);
const vuetify = createVuetify();
app.use(vuetify);

app.mount("#app");
