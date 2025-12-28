# 🚀 SprintDesk

SprintDesk is a modern, full‑stack **project & task management platform** designed for teams that value clarity, speed, and real‑time collaboration.

It provides structured **workspaces**, **projects**, and **Kanban‑style tasks**, along with **role‑based permissions** and **live updates using Socket.IO**.

---

## 🌟 Key Features

### 🔐 Authentication & Authorization
- JWT‑based authentication
- Secure API access
- Protected frontend & backend routes

### 🏢 Workspaces
- Multiple workspaces per user
- Roles:
  - **OWNER** – full control
  - **ADMIN** – manage projects & tasks
  - **MEMBER** – collaborate on tasks
- Invite members via email
- Workspace analytics

### 📁 Projects
- Create, update, delete projects
- Emoji‑based project icons
- Project‑level task organization
- Real‑time updates across users

### ✅ Tasks (Kanban)
- Kanban board (TODO / IN_PROGRESS / DONE)
- Drag & drop status updates
- Assign tasks to members
- Priorities & due dates
- Real‑time task updates

### 🔄 Real‑Time Collaboration
- Powered by **Socket.IO**
- Live updates for:
  - Project creation / update / deletion
  - Task creation / update / deletion
- Automatic UI refresh using RTK Query cache invalidation

---

## 🧠 Architecture Overview

```
Frontend (React + Redux)
        |
        | REST + WebSockets
        |
Backend (Node.js + Express)
        |
        |
MongoDB (Mongoose)
```

---

## 🛠 Tech Stack

### Frontend
- React
- Redux Toolkit
- RTK Query
- React Router
- Tailwind CSS
- Socket.IO Client
- React Hot Toast

### Backend
- Node.js
- Express
- MongoDB & Mongoose
- Socket.IO
- JWT Authentication

---

## ⚙️ Environment Variables

### Backend (`.env`)
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:5000
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/sprintdesk.git
cd sprintdesk
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🔌 Real‑Time Socket Events

### Workspace Room
```
workspace:{workspaceId}
```

### Events Emitted
- `project:created`
- `project:updated`
- `project:deleted`
- `task:created`
- `task:updated`
- `task:deleted`

---

## 🧪 State Management

- Global state handled via **Redux Toolkit**
- Server data cached with **RTK Query**
- Real‑time events invalidate cache automatically

---

## 🔐 Permissions Matrix

| Action | OWNER | ADMIN | MEMBER |
|------|------|------|------|
| Create Workspace | ✅ | ❌ | ❌ |
| Invite Members | ✅ | ✅ | ❌ |
| Manage Members | ✅ | ❌ | ❌ |
| Create Project | ✅ | ✅ | ❌ |
| Delete Project | ✅ | ❌ | ❌ |
| Create Tasks | ✅ | ✅ | ✅ |

---

## 📦 Folder Structure (Simplified)

```
frontend/
 ├─ features/
 ├─ components/
 ├─ pages/
 ├─ sockets/
 └─ api/

backend/
 ├─ controllers/
 ├─ services/
 ├─ models/
 ├─ routes/
 └─ sockets/
```

---
