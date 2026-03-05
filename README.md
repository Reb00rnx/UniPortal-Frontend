# 🎓 UniPortal — Frontend

> Angular frontend for the UniPortal university management system.

**Live:** [uniportall.netlify.app](https://uniportall.netlify.app)  
---

## ✨ Features

**Student**
- Login & registration with JWT authentication
- Browse and enroll in courses
- View grades and course details
- Personal schedule with calendar view (FullCalendar)
- Teacher consultation slots

**Teacher**
- Course and gradebook management
- Assign grades to enrolled students
- Manage consultation availability
- Schedule management

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 17+ (Standalone Components) |
| Language | TypeScript |
| Auth | JWT (HttpInterceptor + Route Guards) |
| Calendar | FullCalendar |
| Styling | CSS (component-scoped) |
| HTTP | Angular HttpClient + RxJS |

## 🚀 Run Locally

```bash
npm install
ng serve
```

App runs at `http://localhost:4200`. Requires backend running at `localhost:8080`.

## 🏗️ Build

```bash
ng build --configuration production
```

## 📁 Structure

```
src/app/
├── components/       # Feature components (courses, grades, schedule...)
├── services/         # HTTP services (auth, course, grade...)
├── routes/           # Route definitions & auth guards
└── interceptors/     # JWT token interceptor
```

## 🔐 Test Accounts

| Role | Email | Password |
|---|---|---|
| Student | alice.brown@student.uni.edu | password123 |
| Teacher | john.smith@uni.edu | password123 |

> ⚠️ Backend runs on Render free tier — first request may take 30–60s to wake up.

---

*Part of a full-stack portfolio project. Backend built with Spring Boot 3 + PostgreSQL.*

