# Run PostgreSQL in Docker
docker run --name modernize-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=modernize -p 5432:5432 -d postgres:14

Write-Host "PostgreSQL Docker container started. Wait a few seconds for it to initialize."
Write-Host "Database credentials:"
Write-Host "  Host: localhost"
Write-Host "  Port: 5432"
Write-Host "  User: postgres"
Write-Host "  Password: postgres"
Write-Host "  Database: modernize"

# Wait for PostgreSQL to start
Start-Sleep -s 5

Write-Host "Creating .env file for backend"
$envContent = @"
# Server configuration
PORT=5000
NODE_ENV=development

# Database configuration
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/modernize

# JWT Secret
JWT_SECRET=modernize_api_secret_key_change_in_production
JWT_EXPIRES_IN=24h
"@

Set-Content -Path "backend/.env" -Value $envContent

Write-Host ".env file created in backend directory"
Write-Host "You can now start the backend with: cd backend && npm run dev" 