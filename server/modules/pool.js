const pg = require('pg');

const Pool = pg.Pool;
const pool = new Pool({
  database: 'weekend-to-do-app',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimoutMillis: 30000,
});

pool.on('connect', () => {
  console.log('Postgres connected!');
});

module.exports = pool;
