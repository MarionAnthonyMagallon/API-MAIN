const { Pool } = require('pg');

// Create a new pool instance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/modernize',
});

// Export the query method for use in other modules
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
}; 