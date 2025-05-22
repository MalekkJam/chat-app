# 🗨️ Talksy

**Release v1.0**  
Talksy is a full-stack, real-time chat platform leveraging Vue.js (frontend), Deno (backend), and SQLite.  
Key features include:
- Real-time private/group messaging via WebSocket
- User authentication (JWT, bcrypt)
- Friend request system
- Admin dashboard for user/chat management and analytics

This release delivers a robust, modern messaging solution with secure authentication and comprehensive admin controls.  
Ready for deployment and extensibility in academic or production environments.

---

## 📌 Project Overview
Chat App is a real-time messaging application where users can **sign up, log in, and send messages** to their friends. It supports both **private chats** and **group chats**. The app also includes features like **friend requests**, **user management**, and **admin controls**. The project is built using **Vue.js** for the frontend and **Deno** for the backend, with **SQLite** as the database.

---

## 🛠️ Tech Stack
- **Frontend:** Vue.js (Vite, Vue Router, TailwindCSS)
- **Backend:** Deno (Oak framework)
- **Database:** SQLite
- **Authentication:** JWT (JSON Web Tokens) with bcrypt for password hashing
- **WebSocket:** Real-time communication for messaging and notifications

---

## 🚀 Features
### User Features:
- **Registration and Login**: Secure user authentication with JWT.
- **Friend Requests**: Send, accept, or reject friend requests.
- **Private and Group Chats**: Real-time messaging with WebSocket.
- **Profile Management**: Update username, email, and password.

### Admin Features:
- **User Management**: View, delete, or manage user accounts.
- **Chat Management**: Create, delete, or manage group chats.
- **Analytics**: View KPIs like total users, new users, and active chats.

---

## 📂 Database Schema
The project consists of **six main tables**:

1. **User** - Stores user credentials and profile information.
2. **Friendship** - Manages friendships between users.
3. **RequestFriendship** - Tracks pending friend requests.
4. **Chat** - Represents chat sessions (private or group).
5. **ChatParticipant** - Links users to chats.
6. **Message** - Stores messages exchanged in chats.

### **Entity-Relationship Diagram (ERD)**

```plaintext
User (user_id, username, email, password_hash)
│
├── Friendship (friendship_id, user_id1, user_id2, created_at)
│
├── RequestFriendship (request_id, sender_id, receiver_id, status)
│
├── Chat (chat_id, chat_type, created_at)
│
├── ChatParticipant (chat_id, user_id, joined_at)
│
└── Message (message_id, chat_id, sender_id, content, timestamp)
```

---

## 🖥️ Installation and Setup

### Prerequisites:
- **Node.js** (for frontend)
- **Deno** (for backend)

### Backend Setup:
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies (if any):
   ```bash
   deno task dev
   ```
3. Start the backend server:
   ```bash
   deno run --allow-net --allow-read --allow-write server.ts
   ```

### Frontend Setup:
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📈 Future Enhancements

- Typing indicators and read receipts
- Push notifications
- Dark mode and improved UI/UX
- More granular admin controls

---

**Note:**  
The codebase will be revised in the future and enhanced in terms of security and design.
