
# Project README

```markdown
# IIUC Hackathon Project: Next Step

## Project Overview
A full-stack web app (React + Express + MongoDB) that helps youth manage skills, browse jobs, and access learning resources.

## Tech Stack
- **Frontend:** [React, Tailwind CSS]
- **Backend:** [Node.js, Express]
- **Database:** [MongoDB]
- **Other Tools:** [Git, etc]

## Setup Instructions


## 📌 Prerequisites

Ensure the following are installed before running the project:

- **Node.js (v18+ recommended)**
- **npm**
- **MongoDB** (local or MongoDB Atlas)
- **Git**
- **A Gmail account for SMTP email verification**
  - Enable **App Passwords** (required for Gmail SMTP)


### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd IIUC_hackathon
```

2. **Frontend Setup:**
```bash
cd frontend
npm install
npm run dev
```

3. **Backend Setup:**
```bash
cd backend
npm install
npm run seed #add seeded data to jobs and resources collection
npm run dev
```

### Environment Configuration
Create a `.env` file in the backend directory:
```
PORT=8000
SECRET_KEY=IIUC_Hackathon
MONGO_URI=<your mongodb database uri>
MAIL_PASS=<your gmail app password>
MAIL_USER=<you gmail>
GEMINI_API_KEY=<your gemini api key>
```
