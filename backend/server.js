
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'netuser',
  host: 'localhost',
  database: 'moviehub',
  password: 'netpass',
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
/*
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Received login request. Username:', username, 'Password:', password);
    console.log('Received login request. Request body:', req.body);
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = rows[0];

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
*/
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

    const existingFavorite = await client.query('SELECT * FROM favorites WHERE user_id = $1 AND movie_id = $2', [userId, movieId]);

    if (existingFavorite.rows.length > 0) {

      return res.status(400).json({ error: 'Movie already favorited by this user' });
    }


    await client.query('INSERT INTO favorites (user_id, movie_id, username) VALUES ($1, $2, $3)', [userId, movieId, username]);

    await client.query('COMMIT');

    res.json({ success: true });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error adding to favorites:', error);

    if (error.code === '23505') {
      return res.status(400).json({ error: 'Movie already favorited by this user' });
    }

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
/*
app.post('/api/register', async (req, res) => {
  const { name, lname, password, email, username, pronouns } = req.body;
  console.log('Received register request. Request body:', req.body);

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(
      'INSERT INTO users (firstName, lastName, email, username, password, pronouns) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, lname, email, username, password, pronouns]
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
*/
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


