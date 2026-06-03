# 🌸 Student Reflection AI — Frontend

> A full-stack AI-powered student wellness platform built with React, Vite, and Tailwind CSS. Connects to a Spring Boot backend with real Google Gemini AI integration.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## ✨ Overview

Student Reflection AI is a modern full-stack wellness platform designed to help students reflect on their daily experiences, track emotional patterns, detect stress levels, and receive personalized AI-powered insights.

The frontend connects to a **Spring Boot REST API** with **JWT authentication** and calls **Google Gemini 2.5 AI** to generate real-time emotional insights, burnout warnings, and personalized study suggestions.

---

## 🎯 Features

### 🔐 Authentication
- JWT-based secure login and registration
- Protected routes — dashboard only accessible when logged in
- Auto token management via Axios interceptors

### 📝 Daily Journaling
- Write daily reflections with mood and productivity tracking
- Voice journaling using Web Speech API — speak instead of typing
- All entries saved to MySQL database via REST API

### 🧠 AI-Powered Insights (Google Gemini 2.5)
- Personalized empathetic insight for every reflection
- Real-time sentiment analysis — Positive / Neutral / Negative
- Emotion classification — Joy, Calm, Sadness, Fear, Anger, Stress
- Stress level detection — Low / Medium / High

### 🤖 AI Insights Panel
- 🔥 Burnout warning — analyzes patterns across recent entries
- 💡 Personalized study suggestions — tailored to your history
- 🌟 Weekly motivational summary — AI-written encouragement
- 📈 Productivity insight — weekly performance analysis
- 🔮 Study pattern prediction — predicts future stress before it happens

### 🌍 Multilingual Support
- Detects Sinhala and English journal entries automatically
- AI responds in both Sinhala and English when Sinhala is detected
- Language badge displayed on each entry card

### 📊 Dashboard & Stats
- Total reflections counter
- Positive days tracker
- High stress days counter
- Dominant emotion display

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework and build tool |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Smooth page animations |
| Axios | HTTP client with JWT interceptor |
| React Router DOM | Client-side routing |
| Web Speech API | Voice journaling feature |

---

## 📂 Project Structure

```plaintext
src/
│
├── main.jsx                # React entry point with BrowserRouter
├── App.jsx                 # Route definitions with protected routes
├── index.css               # Tailwind CSS styles
│
├── api/
│   └── axios.js            # Axios instance with JWT interceptor
│
├── pages/
│   ├── LoginPage.jsx       # Login page with JWT auth
│   ├── RegisterPage.jsx    # Registration page
│   └── DashboardPage.jsx   # Main dashboard with all features
│
└── components/
    └── InsightsPanel.jsx   # AI insights panel component
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- Backend running on `http://localhost:8080`
- See the [Backend Repository](https://github.com/pubudini-rathnayake/student-reflection-ai-backend) for backend setup

### 1. Clone the repository
```bash
git clone https://github.com/pubudini-rathnayake/student-reflection-ai-frontend.git
```

### 2. Navigate to the project folder
```bash
cd student-reflection-ai-frontend
```

### 3. Install dependencies
```bash
npm install
```

### 4. Run the development server
```bash
npm run dev
```

### 5. Open in browser
http://localhost:5173

> ⚠️ Make sure the backend is running first before starting the frontend.

---

## 🔗 Backend Repository

This frontend connects to a Spring Boot backend. See the backend repo for API setup:

[![Backend Repo](https://img.shields.io/badge/Backend_Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pubudini-rathnayake/student-reflection-ai-backend)

---

## 🌈 UI Design

The interface is inspired by:
- Anime aesthetics 🎌
- Soft pastel gradients 🌸
- Glassmorphism UI design ✨
- Modern wellness dashboards 📊

---

## 👩‍💻 Author

**Pubudini Rathnayake**
ICT Undergraduate | Specializing in Artificial Intelligence | Full-Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pubudini-rathnayake-388b062b7)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pubudini-rathnayake)

---

## 📜 License

This project is licensed under the MIT License.
