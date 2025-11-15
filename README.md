# IIUC Hackathon Project: Next Step

## Project Overview
**Next Step** is a comprehensive career development and job matching platform designed to help youth manage their skills, discover job opportunities, and access personalized learning resources. The platform uses AI-powered recommendations to create tailored career roadmaps and match users with suitable jobs.

## 🌟 Key Features

- **User Profile Management** - Create and manage comprehensive career profiles
- **AI-Powered Job Matching** - Get personalized job recommendations based on skills
- **Career Roadmap Generator** - AI-generated learning paths tailored to target roles
- **Job Comparison Tool** - Compare your profile against job requirements
- **AI Career Assistant** - Chat with an AI for career advice
- **Learning Resources** - Access curated learning materials
- **Recruiter Dashboard** - Post and manage job listings
- **Course Provider Portal** - Share educational resources

## 🛠 Tech Stack

### Frontend
- **Framework:** React 19.1.1
- **Routing:** React Router DOM 7.8.0
- **Styling:** Tailwind CSS 4.1.11
- **UI Components:** Radix UI
- **Animations:** Framer Motion 12.23.24
- **Charts:** Recharts 3.4.1
- **HTTP Client:** Axios 1.11.0

### Backend
- **Runtime:** Node.js
- **Framework:** Express 5.1.0
- **Database:** MongoDB with Mongoose 8.17.0
- **Authentication:** JWT (jsonwebtoken 9.0.2)
- **Password Hashing:** bcryptjs 3.0.2
- **AI Integration:** Google Generative AI (Gemini 2.0)
- **File Upload:** Multer 2.0.2 + Cloudinary 1.41.3
- **Email Service:** Nodemailer 6.10.1

## 📋 Prerequisites

Before running the project, ensure you have:

- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**
- **Gmail account** for email verification (with App Passwords enabled)
- **Google Gemini API Key** for AI features
- **Cloudinary account** for file uploads

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd IIUC_hackathon
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=8000
SECRET_KEY=IIUC_Hackathon
MONGO_URI=mongodb://localhost:27017/nextstep
# or use MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/nextstep

# Gmail Configuration for Email Verification
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password

# Google Gemini AI API Key
GEMINI_API_KEY=your-gemini-api-key

# Cloudinary Configuration (for file uploads)
CLOUD_NAME=your-cloudinary-name
CLOUD_KEY=your-cloudinary-key
CLOUD_SECRET=your-cloudinary-secret
```

**Seed the database with initial data:**

```bash
npm run seed
```

**Start the backend server:**

```bash
npm run dev
```

The backend will run on `http://localhost:8000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📚 API Documentation

### Base URL
```
http://localhost:8000/api
```

---

## 🔐 Authentication Routes

**Base Path:** `/api/user`

### 1. Register User
**POST** `/register`

Register a new user account.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "userType": "general"
}
```

**User Types:**
- `general` - Regular job seeker
- `recruiter` - Company recruiter
- `course_provider` - Learning resource provider

**Response:**
```json
{
  "success": true,
  "message": "Verification code sent to your email"
}
```

---

### 2. Verify Email
**POST** `/verify`

Verify email with OTP code sent during registration.

**Request Body:**
```json
{
  "email": "john@example.com",
  "code": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "userType": "general"
  }
}
```

---

### 3. Login
**POST** `/login`

Login to existing account.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "userType": "general"
  }
}
```

---

### 4. Logout
**POST** `/logout`

Logout the current user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 5. Forgot Password
**POST** `/forgot-password`

Request password reset OTP.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent to your email"
}
```

---

### 6. Verify OTP
**POST** `/verify-otp/:email`

Verify the OTP for password reset.

**URL Parameters:**
- `email` - User's email address

**Request Body:**
```json
{
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP verified successfully"
}
```

---

### 7. Change Password
**POST** `/change-password/:email`

Reset password after OTP verification.

**URL Parameters:**
- `email` - User's email address

**Request Body:**
```json
{
  "newPassword": "NewSecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## 👤 User Profile Routes

**Base Path:** `/api/profile`
**Authentication Required:** Yes (General users only)

### 1. Get Current User
**GET** `/me`

Get currently logged-in user details.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "userType": "general"
  }
}
```

---

### 2. Get User Profile
**GET** `/`

Get the logged-in user's profile.

**Response:**
```json
{
  "success": true,
  "profile": {
    "_id": "507f1f77bcf86cd799439012",
    "user": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "skills": ["javascript", "react", "node.js"],
    "bio": "Full-stack developer passionate about web technologies",
    "headline": "Senior Full Stack Developer",
    "targetRoles": ["Full Stack Developer", "Frontend Lead"],
    "education": [...],
    "projects": [...],
    "languages": [...],
    "availability": "open_to_work",
    "isPublic": true,
    "appliedJobs": []
  }
}
```

---

### 3. Create Profile
**POST** `/`

Create a new user profile (first-time setup).

**Request Body:**
```json
{
  "skills": ["javascript", "react", "node.js", "mongodb"],
  "bio": "Full-stack developer with 3 years of experience",
  "headline": "Senior Full Stack Developer",
  "targetRoles": ["Full Stack Developer", "Technical Lead"],
  "availability": "open_to_work",
  "isPublic": true,
  "education": [
    {
      "institution": "Stanford University",
      "degree": "Bachelor of Science",
      "fieldOfStudy": "Computer Science",
      "startYear": 2018,
      "endYear": 2022,
      "grade": "3.8 GPA"
    }
  ],
  "projects": [
    {
      "title": "E-Commerce Platform",
      "description": "Built a full-stack e-commerce website",
      "link": "github.com/john/ecommerce",
      "techStack": ["react", "node.js", "mongodb"],
      "startDate": "2023-01-01",
      "endDate": "2023-06-01",
      "isOngoing": false
    }
  ],
  "languages": [
    { "name": "English", "proficiency": "Native" },
    { "name": "Spanish", "proficiency": "Conversational" }
  ],
  "address": {
    "country": "USA",
    "state": "California",
    "city": "San Francisco",
    "postalCode": "94102"
  }
}
```

**Response:**
```json
{
  "success": true,
  "profile": { ... }
}
```

---

### 4. Update Profile
**PUT** `/`

Update existing user profile.

**Request Body:** (Same structure as Create Profile - all fields optional)

**Response:**
```json
{
  "success": true,
  "profile": { ... }
}
```

---

### 5. Add Applied Job
**PUT** `/addjobs`

Track jobs that user has applied to.

**Request Body:**
```json
{
  "jobId": "507f1f77bcf86cd799439013"
}
```

**Response:**
```json
{
  "success": true,
  "profile": { ... }
}
```

---

### 6. Upload CV Text
**POST** `/cv`

Save CV content as text.

**Request Body:**
```json
{
  "cvText": "Your CV content here..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "CV saved successfully",
  "profile": { ... }
}
```

---

### 7. Update CV Link
**PUT** `/cvLink`

Save link to CV file (e.g., Cloudinary URL).

**Request Body:**
```json
{
  "cvLink": "https://res.cloudinary.com/demo/image/upload/cv.pdf"
}
```

**Response:**
```json
{
  "success": true,
  "message": "CV saved successfully",
  "profile": { ... }
}
```

---

## 💼 Job Routes

**Base Path:** `/api/jobs`

### 1. List All Jobs
**GET** `/`

Get list of jobs with optional filters.

**Query Parameters:**
- `track` - Filter by career track (e.g., "Web Development")
- `location` - Filter by location
- `type` - Filter by job type (Internship, Part-time, Full-time, Freelance)
- `search` - Full-text search in title, company, description
- `limit` - Results per page (default: 50)
- `skip` - Number of results to skip (for pagination)

**Example Request:**
```
GET /api/jobs?track=Web Development&type=Full-time&limit=20&skip=0
```

**Response:**
```json
{
  "success": true,
  "jobs": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Senior Frontend Developer",
      "company": "Tech Corp",
      "location": "San Francisco, CA",
      "requiredSkills": ["react", "javascript", "typescript"],
      "recommendedExperience": "Senior",
      "jobType": "Full-time",
      "description": "Looking for an experienced frontend developer...",
      "track": "Web Development",
      "applyUrl": "https://techcorp.com/careers/123",
      "tags": ["Remote", "Benefits"],
      "isAvailable": true,
      "createdAt": "2025-01-15T10:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 20,
    "skip": 0,
    "hasMore": true
  }
}
```

---

### 2. Get Job Details
**GET** `/:id`

Get detailed information about a specific job.

**URL Parameters:**
- `id` - Job ID

**Response:**
```json
{
  "success": true,
  "job": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Senior Frontend Developer",
    "company": "Tech Corp",
    "location": "San Francisco, CA",
    "requiredSkills": ["react", "javascript", "typescript"],
    "recommendedExperience": "Senior",
    "jobType": "Full-time",
    "description": "Detailed job description...",
    "track": "Web Development",
    "applyUrl": "https://techcorp.com/careers/123",
    "tags": ["Remote", "Benefits"],
    "isAvailable": true,
    "suggestedTo": [],
    "clickedBy": [],
    "appliedBy": [],
    "createdAt": "2025-01-15T10:00:00.000Z"
  }
}
```

---

### 3. Get Recommended Jobs
**GET** `/recommend`

Get personalized job recommendations based on user profile.

**Authentication Required:** Yes

**Response:**
```json
{
  "success": true,
  "jobs": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Senior Frontend Developer",
      "company": "Tech Corp",
      "matchScore": 45,
      "matchedSkills": ["react", "javascript"],
      ...
    }
  ],
  "message": "Found 15 recommended jobs based on your profile"
}
```

**Match Score Calculation:**
- +10 points per matched skill
- +5 points if job track matches user's preferred track
- -5 points if experience level mismatch is > 1 level

---

### 4. Apply to Job
**POST** `/:id/apply`

Apply to a specific job.

**Authentication Required:** Yes

**URL Parameters:**
- `id` - Job ID

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "job": {
    "id": "507f1f77bcf86cd799439013",
    "title": "Senior Frontend Developer",
    "company": "Tech Corp"
  }
}
```

---

### 5. Track Job Application
**PUT** `/addjob`

Add job to user's applied jobs list.

**Authentication Required:** Yes

**Request Body:**
```json
{
  "jobId": "507f1f77bcf86cd799439013"
}
```

**Response:**
```json
{
  "success": true,
  "profile": { ... }
}
```

---

## 🏢 Recruiter Routes

**Base Path:** `/api/recruiter`
**Authentication Required:** Yes (Recruiter users only)

### 1. Get Recruiter Dashboard
**GET** `/dashboard`

Get recruiter profile and posted jobs.

**Response:**
```json
{
  "success": true,
  "profile": {
    "_id": "507f1f77bcf86cd799439014",
    "user": "507f1f77bcf86cd799439011",
    "companyName": "Tech Corp",
    "companyWebsite": "https://techcorp.com",
    "companyLogo": "https://res.cloudinary.com/demo/logo.png",
    "dashboardNotes": "Looking for frontend developers",
    "postedJobs": [...]
  }
}
```

---

### 2. Create Recruiter Profile
**POST** `/dashboard`

Create recruiter profile (one-time setup).

**Request Body:**
```json
{
  "companyName": "Tech Corp",
  "companyWebsite": "https://techcorp.com",
  "companyLogo": "https://res.cloudinary.com/demo/logo.png",
  "dashboardNotes": "Looking for frontend developers"
}
```

**Response:**
```json
{
  "success": true,
  "profile": { ... }
}
```

---

### 3. Update Recruiter Profile
**PUT** `/dashboard`

Update recruiter profile information.

**Request Body:**
```json
{
  "companyName": "Tech Corp Inc.",
  "companyWebsite": "https://techcorp.com",
  "dashboardNotes": "Hiring for multiple positions"
}
```

**Response:**
```json
{
  "success": true,
  "profile": { ... }
}
```

---

### 4. Get Posted Jobs
**GET** `/jobs`

Get all jobs posted by this recruiter.

**Response:**
```json
{
  "success": true,
  "jobs": [...]
}
```

---

### 5. Post New Job
**POST** `/jobs`

Create a new job listing.

**Request Body:**
```json
{
  "title": "Senior Frontend Developer",
  "company": "Tech Corp",
  "location": "San Francisco, CA",
  "requiredSkills": ["react", "javascript", "typescript"],
  "recommendedExperience": "Senior",
  "jobType": "Full-time",
  "description": "We are looking for an experienced frontend developer...",
  "track": "Web Development",
  "applyUrl": "https://techcorp.com/careers/123",
  "tags": ["Remote Friendly", "Health Insurance"]
}
```

**Response:**
```json
{
  "success": true,
  "job": { ... }
}
```

---

### 6. Get Job by ID
**GET** `/jobs/:id`

Get details of a specific job posted by recruiter.

**URL Parameters:**
- `id` - Job ID

**Response:**
```json
{
  "success": true,
  "job": { ... }
}
```

---

### 7. Update Posted Job
**PUT** `/jobs/:id`

Update an existing job listing.

**URL Parameters:**
- `id` - Job ID

**Request Body:** (Same as Post New Job - all fields optional)

**Response:**
```json
{
  "success": true,
  "job": { ... }
}
```

---

### 8. Delete Posted Job
**DELETE** `/jobs/:id`

Delete a job listing.

**URL Parameters:**
- `id` - Job ID

**Response:**
```json
{
  "success": true,
  "message": "Job deleted successfully"
}
```

---

## 📚 Learning Resource Routes

**Base Path:** `/api/resources`

### 1. List All Resources
**GET** `/`

Get list of learning resources with filters.

**Query Parameters:**
- `skill` - Filter by related skill
- `cost` - Filter by cost (Free, Paid, Freemium)
- `platform` - Filter by platform
- `search` - Full-text search
- `limit` - Results per page (default: 50)
- `skip` - Pagination offset

**Example Request:**
```
GET /api/resources?skill=react&cost=Free&limit=20
```

**Response:**
```json
{
  "success": true,
  "resources": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "title": "React Complete Course",
      "platform": "Udemy",
      "url": "https://udemy.com/react-course",
      "relatedSkills": ["react", "javascript"],
      "cost": "Free",
      "description": "Complete React course for beginners",
      "createdBy": "507f1f77bcf86cd799439016",
      "createdAt": "2025-01-10T10:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 80,
    "limit": 20,
    "skip": 0,
    "hasMore": true
  }
}
```

---

### 2. Get Resource Details
**GET** `/:id`

Get details of a specific resource.

**URL Parameters:**
- `id` - Resource ID

**Response:**
```json
{
  "success": true,
  "resource": { ... }
}
```

---

### 3. Get Recommended Resources
**GET** `/recommend`

Get personalized resource recommendations.

**Authentication Required:** Yes

**Response:**
```json
{
  "success": true,
  "resources": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "title": "React Complete Course",
      "matchScore": 25,
      "matchedSkills": ["react", "javascript"],
      ...
    }
  ],
  "message": "Found 12 recommended resources based on your profile"
}
```

---

### 4. Mark Resource Status
**POST** `/:id/mark`

Mark resource as completed or saved.

**Authentication Required:** Yes

**URL Parameters:**
- `id` - Resource ID

**Request Body:**
```json
{
  "status": "completed"
}
```

**Status Options:**
- `completed`
- `saved`

**Response:**
```json
{
  "success": true,
  "message": "Resource marked as completed",
  "resource": {
    "id": "507f1f77bcf86cd799439015",
    "title": "React Complete Course",
    "status": "completed"
  }
}
```

---

### 5. Create Resource
**POST** `/`

Create a new learning resource.

**Authentication Required:** Yes

**Request Body:**
```json
{
  "title": "React Complete Course",
  "platform": "Udemy",
  "url": "https://udemy.com/react-course",
  "relatedSkills": ["react", "javascript"],
  "cost": "Free",
  "description": "Complete React course for beginners"
}
```

**Response:**
```json
{
  "success": true,
  "resource": { ... }
}
```

---

## 🎓 Course Provider Routes

**Base Path:** `/api/course-provider`
**Authentication Required:** Yes (Course Provider users only)

### 1. Get Provider Profile
**GET** `/profile`

Get course provider profile and uploaded resources.

**Response:**
```json
{
  "success": true,
  "profile": {
    "_id": "507f1f77bcf86cd799439017",
    "user": "507f1f77bcf86cd799439011",
    "bio": "Educational content creator",
    "dashboardNotes": "Focus on web development",
    "uploadedResources": [...]
  }
}
```

---

### 2. Create Provider Profile
**POST** `/profile`

Create course provider profile.

**Request Body:**
```json
{
  "bio": "Educational content creator specializing in web development",
  "dashboardNotes": "Creating beginner-friendly courses"
}
```

**Response:**
```json
{
  "success": true,
  "profile": { ... }
}
```

---

### 3. Update Provider Profile
**PUT** `/profile`

Update course provider profile.

**Request Body:**
```json
{
  "bio": "Updated bio",
  "dashboardNotes": "Updated notes"
}
```

**Response:**
```json
{
  "success": true,
  "profile": { ... }
}
```

---

### 4. Get Uploaded Resources
**GET** `/resources`

Get all resources uploaded by this provider.

**Response:**
```json
{
  "success": true,
  "resources": [...]
}
```

---

### 5. Upload New Resource
**POST** `/resources`

Upload a new learning resource.

**Request Body:**
```json
{
  "title": "Advanced React Patterns",
  "platform": "YouTube",
  "url": "https://youtube.com/watch?v=...",
  "relatedSkills": ["react", "javascript"],
  "cost": "Free",
  "description": "Learn advanced React patterns and best practices"
}
```

**Response:**
```json
{
  "success": true,
  "resource": { ... }
}
```

---

### 6. Update Resource
**PUT** `/resources/:id`

Update an uploaded resource.

**URL Parameters:**
- `id` - Resource ID

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description"
}
```

**Response:**
```json
{
  "success": true,
  "resource": { ... }
}
```

---

### 7. Delete Resource
**DELETE** `/resources/:id`

Delete an uploaded resource.

**URL Parameters:**
- `id` - Resource ID

**Response:**
```json
{
  "success": true,
  "message": "Resource deleted successfully"
}
```

---

## 🤖 AI-Powered Features

### 1. Career Roadmap Generator

**POST** `/api/roadmap`

Generate personalized career roadmap using AI.

**Authentication Required:** No (but recommended)

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "jobId": "507f1f77bcf86cd799439013"
}
```

**Response:**
```json
{
  "jobTitle": "Senior Frontend Developer",
  "targetRole": "Frontend Developer",
  "totalDurationWeeks": 24,
  "overview": {
    "summary": "This roadmap will guide you from intermediate to senior frontend developer...",
    "skillsToDevelop": ["Advanced React", "TypeScript", "Testing"],
    "technologiesToLearn": ["Next.js", "GraphQL", "CI/CD"],
    "prerequisites": ["Basic JavaScript", "React fundamentals"]
  },
  "phases": [
    {
      "phaseNumber": 1,
      "title": "Advanced React Patterns",
      "startWeek": 1,
      "endWeek": 6,
      "topics": ["Hooks", "Context API", "Performance Optimization"],
      "technologies": ["React", "Redux", "React Query"],
      "projectIdeas": [
        "Build a complex dashboard with real-time data",
        "Create a state management solution from scratch"
      ],
      "expectedOutcome": "Master advanced React concepts and patterns"
    },
    {
      "phaseNumber": 2,
      "title": "TypeScript & Testing",
      "startWeek": 7,
      "endWeek": 12,
      "topics": ["TypeScript Advanced Types", "Unit Testing", "E2E Testing"],
      "technologies": ["TypeScript", "Jest", "Cypress"],
      "projectIdeas": [
        "Convert existing project to TypeScript",
        "Implement comprehensive test suite"
      ],
      "expectedOutcome": "Write type-safe, well-tested code"
    }
  ],
  "applicationGuidance": {
    "recommendedStartWeek": 18,
    "whatToHaveReady": [
      "Portfolio with 3+ advanced projects",
      "GitHub with clean, documented code",
      "Updated resume highlighting new skills"
    ],
    "howToApply": [
      "Network with senior developers",
      "Contribute to open source projects",
      "Apply to companies with strong engineering culture"
    ]
  },
  "extraRecommendations": {
    "learningResources": [
      {
        "title": "Advanced React Course",
        "type": "Course",
        "platform": "Frontend Masters",
        "url": "https://frontendmasters.com/courses/advanced-react/"
      }
    ],
    "commonMistakes": [
      "Skipping fundamentals to learn advanced topics",
      "Not practicing enough with real projects"
    ],
    "motivation": "Senior frontend developers are in high demand. Stay consistent with your learning!"
  }
}
```

---

### 2. Job Profile Comparison

**POST** `/api/compare`

Compare user profile with job requirements using AI.

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "jobId": "507f1f77bcf86cd799439013"
}
```

**Response:**
```json
{
  "matchScore": 75,
  "skillMatch": ["react", "javascript", "node.js"],
  "missingSkills": ["typescript", "graphql"],
  "experienceNote": "You have 3 years of experience, which meets the 2-5 years requirement",
  "strengths": [
    "Strong React and JavaScript skills",
    "Relevant project experience",
    "Good understanding of full-stack development"
  ],
  "weaknesses": [
    "Missing TypeScript experience",
    "No GraphQL knowledge",
    "Limited testing experience"
  ],
  "fitSummary": "You are a good fit for this role with 75% match. Your React and JavaScript skills align well with the requirements. Consider learning TypeScript and GraphQL to become an excellent candidate.",
  "charts": {
    "skillsRadar": {
      "labels": ["react", "javascript", "node.js", "typescript", "graphql"],
      "user": [1, 1, 1, 0, 0],
      "job": [1, 1, 1, 1, 1]
    },
    "gapBar": {
      "labels": ["typescript", "graphql"],
      "values": [7, 6]
    }
  }
}
```

**Match Score Formula:**
- Skill Match: 60% weight
- Experience Match: 25% weight
- Requirement Fit: 15% weight
- Score Range: 0-100

---

### 3. AI Career Chat

**POST** `/api/chat`

Get career advice from AI assistant.

**Authentication Required:** Yes

**Request Body:**
```json
{
  "conversation": [
    { "role": "user", "content": "How do I become a frontend developer?" },
    { "role": "assistant", "content": "Start by learning HTML, CSS, and JavaScript..." },
    { "role": "user", "content": "What about React?" }
  ]
}
```

**Response:**
```json
{
  "text": "React is a great next step! Focus on learning component-based architecture, state management, and hooks. Build small projects to practice."
}
```

**Chat Features:**
- Context-aware responses based on user profile
- Career-focused advice
- Concise responses (max 200 characters)
- Maintains conversation history

---

### 4. Custom Career Roadmap

**POST** `/api/career-roadmap`

Generate roadmap based on custom target role and timeframe.

**Authentication Required:** Yes

**Request Body:**
```json
{
  "targetJob": "Full Stack Developer",
  "timeframe": "6 months"
}
```

**Response:** (Same structure as Career Roadmap Generator)
