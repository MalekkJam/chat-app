import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import ErrorMessage from "./components/ErrorMessage.vue";
import SuccessMessage from "./components/SuccessMessage.vue";
import Sidebar from "./components/Sidebar.vue";
import Navabar from "./components/Navbar.vue";
import Home from "./components/Home.vue";
import Conversation from "./components/Conversation.vue";
import Settings from "./components/Settings.vue";
import router from "@/routes/routes";
import Popup from "./components/Popup.vue";
import AdminAnalytics from "./components/AdminAnalytics.vue";
import AdminUserTable from "./components/AdminUserTable.vue";
import AdminChatTable from "./components/AdminChatTable.vue";

const app = createApp(App);

// Global registration of the components
app.component("Login", Login);
app.component("Register", Register);
app.component("ErrorMessage", ErrorMessage);
app.component("Sidebar", Sidebar);
app.component("Navbar", Navabar);
app.component("Home", Home);
app.component("SuccessMessage", SuccessMessage);
app.component("Conversation", Conversation);
app.component("Popup", Popup);
app.component("Settings", Settings);
app.component("AdminAnalytics", AdminAnalytics);
app.component("AdminUserTable", AdminUserTable);
app.component("AdminChatTable", AdminChatTable);

app.use(router);
app.mount("#app");
