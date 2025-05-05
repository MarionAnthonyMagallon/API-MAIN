# API Project

This repository contains both the frontend and backend code for the API project.

## Structure

- **backend/**: Contains the backend API code
- **frontend/**: Contains the Next.js frontend code

## Setup Instructions

### Database Setup (Required for Backend)

This project requires PostgreSQL. You can set it up using Docker:

#### Using PowerShell (Windows):
```
.\setup-postgres.ps1
```

#### Using Bash (Linux/Mac):
```
bash setup-postgres.sh
```

Alternatively, you can manually set up PostgreSQL and create a `.env` file in the backend directory with the following content:
```
# Server configuration
PORT=5000
NODE_ENV=development

# Database configuration
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/modernize

# JWT Secret
JWT_SECRET=modernize_api_secret_key_change_in_production
JWT_EXPIRES_IN=24h
```

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file with the following content:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Git Flow

This repository follows the Git Flow methodology:

- `main`: Production-ready code
- `develop`: Development branch where features are integrated
- `feature/*`: Feature branches for new functionalities
- `hotfix/*`: Hotfix branches for urgent fixes

## License

[MIT License](LICENSE) 