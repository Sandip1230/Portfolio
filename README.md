# Sandip Maitra — Portfolio

A full-stack developer portfolio built to look and feel like my own code editor — file-tree sidebar navigation, a tabbed IDE-style layout, and a terminal boot sequence on load. Built with the MERN stack.

**Live demo:** [add-your-deployed-link-here]

---

## Tech Stack

**Frontend**
- React (Vite)
- Plain CSS (custom design system, no framework)
- JetBrains Mono + Inter

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- REST API (`/api/projects`, `/api/contact`)

---

## Features

- Terminal-style animated boot sequence on the hero
- IDE-inspired layout — file-tree sidebar, open-tab navigation
- Project grid pulled from a live API, with detail modals
- Working contact form that saves submissions to MongoDB
- Fully responsive down to mobile

---

## Project Structure

```
portfolio/
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── data/
│       │   └── sections.js
│       └── components/
│           ├── Terminal.jsx
│           └── ProjectModal.jsx
│
└── backend/
    ├── server.js
    ├── .env
    ├── data/
    │   └── projects.json
    ├── models/
    │   └── Contact.js
    └── routes/
        ├── contact.js
        └── projects.js
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- A MongoDB Atlas cluster (or local MongoDB instance)

### 1. Clone the repo
```bash
git clone https://github.com/Sandip1230/portfolio.git
cd portfolio
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```dotenv
MONGO_URI="your_mongodb_connection_string"
PORT=5000
```

Run the server:
```bash
cd backend
node server.js
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`, with API requests proxied to `http://localhost:5000`.

---

## API Endpoints

| Method | Endpoint         | Description                        |
|--------|------------------|-------------------------------------|
| GET    | `/api/projects`  | Returns all project data as JSON    |
| POST   | `/api/contact`   | Saves a contact form submission     |

---

## Author

**Sandip Maitra**
B.Tech CSE Student, JIS College of Engineering

- GitHub: [github.com/Sandip1230](https://github.com/Sandip1230)
- LinkedIn: [linkedin.com/in/sandip-maitra-20016137a](https://www.linkedin.com/in/sandip-maitra-20016137a/)
- Email: maitrasandip99@gmail.com

---

## License

This project is open for reference — feel free to fork it, but please don't copy the content verbatim for your own portfolio.