import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import ErrorMessage from "./components/ErrorMessage.vue";

const app = createApp(App);

// Global registration of the components
app.component("Login", Login);
app.component("Register", Register);
app.component("ErrorMessage", ErrorMessage);

app.mount("#app");
