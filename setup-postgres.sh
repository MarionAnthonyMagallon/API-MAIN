#!/bin/bash

# Run PostgreSQL in Docker
docker run --name modernize-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=modernize -p 5432:5432 -d postgres:14

echo "PostgreSQL Docker container started. Wait a few seconds for it to initialize."
echo "Database credentials:"
echo "  Host: localhost"
echo "  Port: 5432"
echo "  User: postgres"
echo "  Password: postgres"
echo "  Database: modernize"

# Wait for PostgreSQL to start
sleep 5

echo "Creating .env file for backend"
cat > backend/.env << EOF
# Server configuration
PORT=5000
NODE_ENV=development

# Database configuration
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/modernize

# JWT Secret
JWT_SECRET=modernize_api_secret_key_change_in_production
JWT_EXPIRES_IN=24h
EOF

echo ".env file created in backend directory"
echo "You can now start the backend with: cd backend && npm run dev" 