const { Pool } = require('pg');

const pool = new pg.Pool({
    user: 'myuser',
    host: 'localhost',
    database: 'mydatabase',
    password: 'mypassword',
    port: 5432,
  });
  
module.exports = pool;
