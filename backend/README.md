# Modernize Backend

This is the backend API for the Modernize Next.js application, built with Express.js and PostgreSQL.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a PostgreSQL database named `modernize`

3. Create a `.env` file with the following variables:
   ```
   DATABASE_URL=postgresql://postgres:password@localhost:5432/modernize
   PORT=5000
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=24h
   ```

4. Start the server:
   ```
   npm run dev  # For development with hot reload
   ```
   or
   ```
   npm start    # For production
   ```

## API Endpoints

### Public Endpoints

- **POST /api/users/register**
  - Register a new user
  - Body: `{ name, email, password }`
  - Response: `{ message, user }`

- **POST /api/users/login**
  - Login a user
  - Body: `{ username, password }`
  - Response: `{ message, token, user }`

### Protected Endpoints (require Authentication)

- **POST /api/add-user**
  - Add a new user (requires valid JWT token)
  - Header: `Authorization: Bearer <token>`
  - Body: `{ name, email, role }`
  - Response: `{ message, user }`

- **GET /api/users**
  - Get all users (requires valid JWT token)
  - Header: `Authorization: Bearer <token>`
  - Response: `{ users }`

- **GET /api/me**
  - Get current user profile (requires valid JWT token)
  - Header: `Authorization: Bearer <token>`
  - Response: `{ user }`

## Database Schema

### Users Table

| Column      | Type      | Description                   |
|-------------|-----------|-------------------------------|
| id          | SERIAL    | Primary key                   |
| name        | VARCHAR   | User's full name              |
| email       | VARCHAR   | User's email (unique)         |
| password    | VARCHAR   | Bcrypt hashed password        |
| role        | VARCHAR   | User role (default: 'user')   |
| created_at  | TIMESTAMP | Creation timestamp            |

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_token>
```

Tokens are obtained by logging in through the `/api/users/login` endpoint. 