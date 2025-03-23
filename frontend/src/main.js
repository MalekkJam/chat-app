import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import ErrorMessage from "./components/ErrorMessage.vue";
import Sidebar from "./components/Sidebar.vue";
import Navabar from "./components/Navbar.vue";
import Home from "./components/Home.vue";
import router from "@/routes/routes";

const app = createApp(App);

// Global registration of the components
app.component("Login", Login);
app.component("Register", Register);
app.component("ErrorMessage", ErrorMessage);
app.component("Sidebar", Sidebar);
app.component("Navbar", Navabar);
app.component("Home", Home);

app.use(router);
app.mount("#app");
