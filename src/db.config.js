// server.js
const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

const pool = new Pool({
  user: "myuser",
  host: "localhost",
  database: "mydatabase",
  password: "mypassword",
  port: 5432,
});

app.get('/user', async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});

app.put('/user', async (req, res) => {
  const { id, name, email, birthdate, phone_number, address, pronouns } = req.body;
  const result = await pool.query(
    'UPDATE users SET name = $1, email = $2, birthdate = $3, phone_number = $4, address = $5, pronouns = $6 WHERE id = $7 RETURNING *',
    [name, email, birthdate, phone_number, address, pronouns, id]
  );
  res.json(result.rows[0]);
});

app.post('/user', async (req, res) => {
  const { name, email, birthdate, phone_number, address, pronouns } = req.body;
  const result = await pool.query('INSERT INTO users (name, email, birhdate, phone_number, address, pronouns) VALUES ($1, $2) RETURNING *', [name, email, birthdate, phone_number, address, pronouns]);
  res.json(result.rows[0]);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});