import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/global.css"; // Jika Anda memiliki gaya global

createApp(App).use(router).mount("#app");
