const express = require('express');
const { Pool } = require('pg');
const Filter = require('bad-words');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'kayttajanimi',
  host: 'localhost',
  database: 'moderation',
  password: 'salasana',
  port: 5432,
});

const createWarningTableQuery = `
  CREATE TABLE IF NOT EXISTS warnings (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    message TEXT
  );
`;

pool.query(createWarningTableQuery);

const filter = new Filter();

// Middleware asiattoman kielen tarkastamiseen
app.use((req, res, next) => {
  const { userId, message } = req.body;

  // Tarkasta asiaton kieli bad-words-kirjastolla
  if (filter.isProfane(message)) {

    const insertWarningQuery = `
      INSERT INTO warnings (user_id, message)
      VALUES ($1, $2)
    `;

    pool.query(insertWarningQuery, [userId, message], (err) => {
      if (err) {
        console.error('Error inserting warning into database:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      return res.status(403).json({ error: 'Asiaton kieli havaittu.' });
    });
  } else {
    next();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});