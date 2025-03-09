# 🗨️ Chat App

## 📌 Project Overview
Chat App is a real-time messaging application where users can **sign up, log in, and send messages** to their friends. It supports both **private chats** and **group chats**. The app is built using **Vue.js** for the frontend and **Deno** for the backend, with **SQLite** as the database.

## 🛠️ Tech Stack
- **Frontend:** Vue.js (Vite, Vue Router, Pinia)
- **Backend:** Deno (Oak framework)
- **Database:** SQLite
- **Authentication:** JWT (JSON Web Tokens) with bcrypt for password hashing

---

## 📂 Database Schema
The project consists of **five main tables**:

1. **User** - Stores user credentials.
2. **Friendship** - Manages friendships between users.
3. **Chat** - Represents chat sessions (private or group).
4. **ChatParticipant** - Links users to chats.
5. **Message** - Stores messages exchanged in chats.

### **Entity-Relationship Diagram (ERD)**

```plaintext
User (user_id, username, email, password_hash)
│
├── Friendship (friendship_id, user_id, friend_id, created_at)
│
├── Chat (chat_id, chat_type, created_at)
│
├── ChatParticipant (chat_id, user_id, joined_at)
│
└── Message (message_id, chat_id, sender_id, content, timestamp)
