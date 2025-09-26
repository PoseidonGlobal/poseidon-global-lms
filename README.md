# Poseidon Global Maritime University LMS

Place your logo at: `frontend/public/logo.png` and keep the same filename to use the reference below.

![Poseidon Global Logo](./frontend/public/logo.png)

## Founders
- **Chief Security Officer**: Kaeleigh Woodward
- **Partner**: [Add partner's name here]

## Mission Statement
**Bringing maritime security courses alive and to persons who have never worked at sea, allowing them a glimpse and opportunity to achieve greatness with information before embarkation—making the transitions smoother than ever.**

---

## Features
- **Authentication & Security**
  - User registration with email validation and secure password requirements
  - JWT-based authentication with NextAuth.js integration
  - Session management with automatic login/logout UI updates
  - Protected routes with role-based access control (admin/student)
  - Backend API protection with JWT middleware
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

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20+ (LTS recommended)
- **npm** 9.0.0+
- **Git**

You can verify your versions:
```bash
node --version  # Should be 20.0.0 or higher
npm --version   # Should be 9.0.0 or higher
git --version
```

---

## Getting Started (Docker)

1) Add your logo to `frontend/public/logo.png` (optional).
2) Build and run:
```bash
docker-compose up --build
```
3) Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/health

---

## Local Development (MonoRepo)

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/PoseidonGlobal/poseidon-global-lms.git
cd poseidon-global-lms

# Install root dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

### 2. Environment Configuration

```bash
# Copy environment templates
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local
```

**Environment Files:**
- `.env` - Root environment variables
- `backend/.env` - Backend configuration (PORT=4000, NEXTAUTH_SECRET)
- `frontend/.env.local` - Frontend configuration (NEXTAUTH_SECRET, DATABASE_URL)

**Required Environment Variables:**

For Frontend (`frontend/.env.local`):
```bash
NEXTAUTH_SECRET=4f8c0b3a2d7e1f9a8b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4
DATABASE_URL=file:./dev.db
NEXTAUTH_URL=http://localhost:3000
```

For Backend (`backend/.env`):
```bash
PORT=4000
NODE_ENV=development
NEXTAUTH_SECRET=4f8c0b3a2d7e1f9a8b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4
```

⚠️ **Important**: Make sure the `NEXTAUTH_SECRET` is the same in both files for JWT authentication to work properly.

### 3. Start Development Servers

```bash
# Start both frontend and backend concurrently
npm run dev
```

This will start:
- **Backend**: http://localhost:4000
- **Frontend**: http://localhost:3000

### 4. Verify Setup

Visit http://localhost:3000 and you should see:
- The Poseidon Global LMS landing page
- Backend connection status (should show "Backend Online")
- Links to API endpoints

---

## Development Commands

### Root Level Commands
```bash
npm run dev           # Start both frontend and backend
npm run lint          # Lint both projects
npm run format        # Format code in both projects
npm run install:all   # Install dependencies for all workspaces
```

### Backend Commands
```bash
cd backend
npm run dev           # Start backend with nodemon
npm run start         # Start backend in production mode
npm run lint          # Lint backend code
npm run format        # Format backend code
```

### Frontend Commands
```bash
cd frontend
npm run dev           # Start Next.js dev server
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Lint frontend code
npm run format        # Format frontend code
```

---

## Individual Component Development (without MonoRepo scripts)

### Backend:
```bash
cd backend
npm install
npm run dev
```
http://localhost:4000/health

### Frontend:
```bash
cd frontend
npm install
npm run dev
```
http://localhost:3000

---
│   ├── .env.example            # Backend environment template
│   ├── .eslintrc.json          # Backend ESLint config
│   ├── .prettierrc             # Backend Prettier config
│   └── package.json            # Backend dependencies
├── frontend/
│   ├── app/
│   │   ├── globals.css         # Global styles
│   │   ├── layout.js           # Root layout
│   │   └── page.js             # Homepage
│   ├── .env.local.example      # Frontend environment template
│   ├── .prettierrc             # Frontend Prettier config
│   └── package.json            # Frontend dependencies
├── .editorconfig               # Editor configuration
├── .gitignore                  # Git ignore patterns
├── .nvmrc                      # Node version specification
├── .env.example                # Root environment template
├── package.json                # Root package configuration
└── README.md                   # This file
```

---

## API Endpoints

### Backend (http://localhost:4000)

- **GET /healthz** - Health check endpoint
  ```json
  {
    "status": "ok",
    "uptime": 123.45,
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
  ```

- **GET /api/v1/hello** - Sample API endpoint
  ```json
  {
    "message": "Hello from LMS backend"
  }
  ```

- **GET /api/v1/protected** - Protected route (requires JWT)
  ```bash
  # Request with Authorization header
  curl -H "Authorization: Bearer <jwt_token>" http://localhost:4000/api/v1/protected
  ```

- **GET /api/v1/validate-token** - Token validation endpoint
  ```json
  {
    "valid": true,
    "user": {
      "sub": "1",
      "name": "Test User",
      "email": "test@example.com",
      "role": "student"
    }
  }
  ```

### Frontend (http://localhost:3000)

- **POST /api/register** - User registration endpoint
- **GET/POST /api/auth/[...nextauth]** - NextAuth authentication endpoints

---

## Authentication System

### Features
- **User Registration**: Secure account creation with validation
- **JWT Authentication**: Token-based authentication for API access
- **Session Management**: Persistent login state across page refreshes
- **Role-based Access**: Admin and student role differentiation
- **Protected Routes**: Automatic redirects for unauthorized access

### Demo Accounts
```
Admin: admin@example.com / admin1234
Student: student1@example.com / password123
```

### Registration Flow
1. Navigate to http://localhost:3000/register
2. Fill out the form with name, email, and password (8+ characters)
3. System creates account with automatic username generation
4. Redirect to login page
5. Use new credentials to log in

### Backend JWT Usage
```javascript
// Generate token (done automatically by NextAuth)
const token = jwt.sign(userPayload, process.env.NEXTAUTH_SECRET);

// Use token in API requests
const response = await fetch('http://localhost:4000/api/v1/protected', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Protected Pages
- `/admin` - Admin dashboard (admin role required)
- `/student` - Student dashboard (authenticated users)  
- `/student/[username]` - Individual student pages (username match required)

---

## Visual Studio Code Setup

### Recommended Extensions

The project includes VS Code configuration with recommended extensions:

1. **ESLint** (`dbaeumer.vscode-eslint`) - JavaScript linting
2. **Prettier** (`esbenp.prettier-vscode`) - Code formatting
3. **TypeScript and JavaScript Language Features** (`ms-vscode.vscode-typescript-next`) - Enhanced JS support
4. **GitHub Copilot** (`GitHub.copilot`) - AI-powered coding assistant
5. **GitHub Copilot Chat** (`GitHub.copilot-chat`) - AI chat integration
6. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) - Tailwind CSS support

### Automatic Setup

When you open the project in VS Code:
1. You'll be prompted to install recommended extensions
2. Code will automatically format on save
3. ESLint will provide real-time feedback

### GitHub Copilot Configuration

To set up GitHub Copilot in VS Code:
1. Install the GitHub Copilot extension
2. Sign in with your GitHub account
3. Ensure you have an active Copilot subscription
4. [Learn more about GitHub Copilot](https://docs.github.com/en/copilot)

For Visual Studio users:
- [GitHub Copilot for Visual Studio](https://docs.github.com/en/copilot/using-github-copilot/getting-started-with-github-copilot?tool=visualstudio)

---

## Docker Setup (Alternative)

If you prefer using Docker:

```bash
# Build and run with Docker Compose
docker-compose up --build
```

**Access Points:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/healthz

---

## Continuous Integration

The project includes GitHub Actions workflows that run on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**CI Pipeline:**
- ✅ Install dependencies
- ✅ Lint code (ESLint)
- ✅ Build frontend
- ✅ Verify backend startup

---

## Contributing

### Code Style

The project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **EditorConfig** for consistent editor settings

Before committing:
```bash
npm run lint    # Check for linting errors
npm run format  # Format all code
```

### Development Workflow

1. Create a feature branch from `main`
2. Make your changes
3. Run linting and formatting
4. Test your changes locally
5. Submit a pull request

---

## Troubleshooting

### Backend Not Starting
- Ensure port 4000 is available
- Check backend/.env file exists
- Verify Node.js version (20+)

### Frontend Not Starting
- Ensure port 3000 is available
- Check frontend/.env.local file exists
- Clear Next.js cache: `cd frontend && rm -rf .next`

### CORS Issues
- Verify NEXT_PUBLIC_API_BASE_URL in frontend/.env.local
- Ensure backend CORS is properly configured

### Environment Variables
- Copy all .example files to remove .example extension
- Restart servers after changing environment variables

---

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Development**: ESLint, Prettier, Nodemon
- **CI/CD**: GitHub Actions

---

## License

© 2024 Poseidon Global Maritime University. All rights reserved.
=======
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
>>>>>>> main
