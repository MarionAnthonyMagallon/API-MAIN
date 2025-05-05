# API Project

This repository contains both the frontend and backend code for the API project.

## Structure

- **backend/**: Contains the backend API code
- **frontend/**: Contains the Next.js frontend code

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file based on `.env.example` (if available)

4. Start the backend server:
   ```
   npm start
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

3. Set up environment variables:
   - Create a `.env.local` file based on `.env.example` (if available)
   - Ensure the API endpoint is correctly configured

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