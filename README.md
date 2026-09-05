# 🎮 Games Catalog (Full-Stack Application)

A modern, responsive full-stack web application for discovering, searching, and saving your favorite video games. Built with a focus on clean UI/UX, robust state management, and scalable SCSS architecture.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-%23880000.svg?style=for-the-badge&logo=mongoose&logoColor=white)

## 📌 Features

- **🔐 User Authentication:** Secure registration and login flow with JWT token management.
- **🔍 Smart Search & Filtering:** Dynamic game search and sorting capabilities without page reloads.
- **❤️ Favorites System:** Authenticated users can add or remove games from their personal collection (saved to the database).
- **📱 Fully Responsive UI:** Carefully crafted adaptive design for Mobile, Tablet, and Desktop using custom SCSS mixins and variables.
- **🚀 Optimized UX:** 
  - Custom loaders and skeleton states (preventing FOUC).
  - Toast notifications for error handling and success states.
  - Smart routing with automatic `ScrollToTop` handling.
  - Interactive UI components (Drawers, Modals, Swiper carousels).

## 🛠 Tech Stack

### Frontend
- **Core:** React 18, TypeScript, Vite
- **Routing:** React Router v6
- **Styling:** SCSS (BEM methodology, advanced variables architecture, mixins)
- **HTTP Client:** Axios
- **UI Libraries:** React Icons, Swiper

### Backend
- **Core:** Node.js, Express, TypeScript (CommonJS)
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT), bcrypt
- **Deployment:** Render

---

## 🏗 Architecture & Best Practices

- **Domain-Based Folder Structure:** Components are logically grouped by feature (e.g., `layout/`, `game/`, `sections/`, `common/`) for high maintainability.
- **Design System:** Extracted all hardcoded colors, opacities, and breakpoints into a centralized `_variables.scss` file.
- **Custom Hooks:** Extracted reusable logic into hooks like `useModalClose` (handling Escape key and scroll lock), `useDebounce`, and `useScrollToTop`.

---

## 📸 Screenshots

<img width="1710" height="1107" alt="Screenshot main page" src="https://github.com/user-attachments/assets/60574f48-4841-4583-89bf-42371cb3bb39" />

<img width="1710" height="1107" alt="Screenshot pages of game" src="https://github.com/user-attachments/assets/206f868f-6a25-49f5-a2df-7cbc9abedc34" />

<img width="1710" height="1107" alt="Screenshot pages of game (2)" src="https://github.com/user-attachments/assets/8025b4d4-b7a2-4c96-857f-ead9197a2c5b" />

<img width="270" height="580" alt="Screenshot main page mobile" src="https://github.com/user-attachments/assets/b13475ec-1a74-4df3-9af2-f62872b22d46" />

<img width="270" height="580" alt="Screenshot pages of game mobile" src="https://github.com/user-attachments/assets/292023af-8c7d-4963-8166-0d855f9a4a0a" />

<img width="270" height="580" alt="Screenshot feature list mobile" src="https://github.com/user-attachments/assets/ec05f59a-524e-4e88-8a8a-670f2e4d766f" />

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git (configured with SSH recommended)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Ageyan/andrei-games-catalog
```

2. **Install frontend dependencies:**

```bash
cd client
npm install
```

3. **Install backend dependencies:**

```bash
cd server
npm install
```

4. **Set up environment variables:** Create `.env` files in both `client` and `server`
   directories based on `.env.example`.

5. **Start the development servers:**

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
cd client
npm run dev
```

### 👨‍💻 Author
Andrey - Junior Frontend Developer - [GitHub Profile](https://github.com/Ageyan)
