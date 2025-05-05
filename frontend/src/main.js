import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import Login from "./components/auth/Login.vue";
import Register from "./components/auth/Register.vue";
import ErrorMessage from "./components/common/ErrorMessage.vue";
import SuccessMessage from "./components/common/SuccessMessage.vue";
import Sidebar from "./components/common/Sidebar.vue";
import Navabar from "./components/common/Navbar.vue";
import Home from "./components/views/Home.vue";
import Conversation from "./components/common/Conversation.vue";
import Settings from "./components/user/Settings.vue";
import router from "@/routes/routes";
import Popup from "./components/user/PopupAccountDeletion.vue";
import AdminAnalytics from "./components/admin/AdminAnalytics.vue";
import AdminUserTable from "./components/admin/AdminUserTable.vue";
import AdminChatTable from "./components/admin/AdminChatTable.vue";
import AdminAddConversation from "./components/admin/AdminAddChat.vue";
import AdminChatContainer from "./components/admin/AdminChatContainer.vue";
import LandingPage from "./components/user/LandingPage.vue";

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
app.component("AdminAddConversation", AdminAddConversation);
app.component("AdminChatContainer", AdminChatContainer);
app.component("LandingPage", LandingPage);

app.use(router);
app.mount("#app");
