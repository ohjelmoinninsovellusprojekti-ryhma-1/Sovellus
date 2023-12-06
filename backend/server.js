
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'netuser',
  password: 'netpass',
  database: 'moviehub',
  connectionLimit: 10, 
  waitForConnections: true,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Endpointit
app.get('/api/data', async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM favorites');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Received login request. Username:', username, 'Password:', password);
    const [userRows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (userRows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userRows[0];

    if (password === user.password) {
      res.json({ success: true, userId: user.user_id, message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/add-to-favorites', async (req, res) => {
  const { userId, movieId, title, releaseYear } = req.body;
  console.log('Received add-to-favorites request. Request body:', req.body);
  console.log('Received add-to-favorites request. user_id:', userId, 'movie_id:', movieId);

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    await connection.query('INSERT INTO movies (title, release_year) VALUES (?, ?) ON DUPLICATE KEY UPDATE title = VALUES(title), release_year = VALUES(release_year)', [title, releaseYear]);
    await connection.query('INSERT INTO favorites (user_id, movie_id) VALUES (?, ?)', [userId, movieId]);
    await connection.commit();

    res.json({ success: true });
  } catch (error) {
    await connection.rollback();
    console.error('Error adding to favorites:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    connection.release(); 
  }
});




