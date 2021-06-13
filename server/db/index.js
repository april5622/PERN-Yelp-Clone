const { Pool } = require('pg');

// Pool is what will connect to Postgres DB
const pool = new Pool();

module.exports = {
  query: (text, params) => pool.query(text, params),
};