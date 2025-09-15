# Poseidon Global Maritime University LMS

Place your logo at: `frontend/public/logo.png` and keep the same filename to use the reference below.

![Poseidon Global Logo](./frontend/public/logo.png)

Founders:
- Chief Security Officer: Kaeleigh Woodward
- Partner: [Add partner's name here]

## Mission Statement
Bringing maritime security courses alive and to persons who have never worked at sea, allowing them a glimpse and opportunity to achieve greatness with information before embarkation—making the transitions smoother than ever.

---

## Features
- Modular courses with quizzes and final exams, delivered in slideshow format
- Personal student dashboard (track progress, courses, certificates)
- Admin dashboard for founders (student tracking, analytics, feedback)
- AI-powered learning bot (student support)
- Real-time course chat for students
- Testimonials section
- Automated email notifications
- Secure payments and course unlocking
- Mobile responsive design

---

## Getting Started (Docker)

1) Add your logo to `frontend/public/logo.png` (optional).
2) Build and run:
```bash
docker-compose up --build
```
3) Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/health

---

## Local development without Docker

- Backend:
  ```bash
  cd backend
  npm install
  npm run dev
  ```
  http://localhost:5000/health

- Frontend:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
  http://localhost:3000