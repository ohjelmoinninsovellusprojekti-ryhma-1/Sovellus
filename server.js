const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = 5000;
const bcrypt = require ('bcrypt');

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'moviehubtietokanta',
  password: 'kissa123',
  port: 5432, 
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/api/data', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM movie_reviews');
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

    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
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
  const { userId, movieId, username } = req.body;
  console.log('Received add-to-favorites request. Request body:', req.body);

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query('INSERT INTO favorites (user_id, movie_id, username) VALUES ($1, $2, $3)', [userId, movieId, username]);

    await client.query('COMMIT');

    res.json({ success: true });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error adding to favorites:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.release();
  }
});



app.post('/api/add-rating', async (req, res) => {
  console.log('Received add-star-rating request. Request body:', req.body);
  const { userId, movieId, rating, username } = req.body;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query('INSERT INTO movie_reviews (user_id, movie_id, rating, username) VALUES ($1, $2, $3, $4)', [userId, movieId, rating, username]);

    await client.query('COMMIT');

    res.json({ success: true });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error adding star rating:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.release();
  }
});



app.post('/api/add-a-review', async (req, res) => {
  const { movieId, reviewText, username, userId } = req.body;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    await client.query(
      'INSERT INTO movie_reviews (movie_id, review_text, created_at, username, user_id) VALUES ($1, $2, NOW(), $3, $4)',
      [movieId, reviewText, username, userId]
    );
    await client.query('COMMIT');

    res.json({ success: true, message: 'Review added successfully' });

  } catch (error) {
    await client.query('ROLLBACK');

    console.error('Error adding review:', error);

    res.status(500).json({ success: false, error: 'Internal Server Error' });
  } finally {
    client.release();
  }
});

app.get('/api/data-fav', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM favorites');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/register', async (req, res) => {
  const { name, lname, password, email, username, pronouns } = req.body;
  console.log('Received register request. Request body:', req.body);

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const hashedPassword = await bcrypt.hash(password, 11);

    await client.query(
      'INSERT INTO users (firstName, lastName, email, username, password, pronouns) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, lname, email, username, hashedPassword, pronouns]
    );

    await client.query('COMMIT');

    console.log('Registration successful');
    res.json({ success: true, message: 'Registration successful' });

  } catch (error) {
    await client.query('ROLLBACK');

    console.error('Error registering:', error);

    res.status(500).json({ success: false, error: 'Internal Server Error' });
  } finally {
    client.release();
  }
});

  
/* app.post('/api/login', async (req, res) => {
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
  });*/

