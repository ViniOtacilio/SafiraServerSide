require('dotenv/config');

const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res) 
//   pool.end() 
// });

module.exports = { pool };