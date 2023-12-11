
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const app = express();
const port = 5000;
const multer = require('multer');
const storage = multer.memoryStorage(); // Store the file in memory as bytes
const upload = multer({ storage: storage });

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

app.post('/submit-form', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );
    client.release();

    res.json({ success: true });
  } catch (error) {
    console.error('Error inserting into the database:', error);
    res.status(500).json({ success: false, error: 'Error submitting form' });
  }
});
/////KOKEILUA TÄSTÄ ALASPÄIN
app.post('/api/user-preferences', async (req, res) => {
  console.log('Received register request. Request body:', req.body);
  try {
    const { userId, newsPreference, moviesPreference, reviewsPreference, tvPreference } = req.body;

    const result = await pool.query(
      'INSERT INTO user_preferences (user_id, news_preference, movies_preference, reviews_preference, tv_preference) ' +
        'VALUES ($1, $2, $3, $4, $5) ' +
        'ON CONFLICT (user_id) DO UPDATE SET ' +
        'news_preference = $2, movies_preference = $3, reviews_preference = $4, tv_preference = $5 RETURNING *',
      [userId, newsPreference, moviesPreference, reviewsPreference, tvPreference]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error saving preferences:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/user-preferences/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Fetching preferences for user_id:', userId);
    const result = await pool.query('SELECT * FROM user_preferences WHERE user_id = $1', [userId]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User preferences not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error retrieving preferences:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
////MARIETAN

app.get('/api/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  console.log('Handling GET request to fetch user data', userId);

  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);

    if (result.rows.length === 0) {
    
      console.log(`User with ID ${userId} not found`);
      res.status(404).json({ error: 'User not found' });
    } else {
      const userData = result.rows[0];
      console.log('User data fetched successfully');
      res.json(userData);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/user/:userId', upload.single('profilePicture'), async (req, res) => {
  const { userId } = req.params;
  console.log('Handling POST request to update user data', userId);
  const { firstname, email, pronouns, birthdate, phone_number, address } = req.body;

  try {
    let profilePictureData = null;

    if (req.file) {
      profilePictureData = req.file.buffer; 
    }

    const result = await pool.query(
      'UPDATE users SET firstname = $1, email = $2, pronouns = $3, birthdate = $4, phone_number = $5, address = $6, profile_picture = $7 WHERE user_id = $8 RETURNING *',
      [firstname, email, pronouns, birthdate, phone_number, address, profilePictureData, userId]
    );

    console.log('User data updated successfully');
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Delete user account
app.delete('/api/user/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [userId]);
    res.json({ message: 'Account and data deleted successfully', deletedUser: result.rows[0] });
  } catch (error) {
    console.error('Error deleting user account:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/favorites/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Fetching favorites for user_id:', userId);
    const result = await pool.query('SELECT * FROM favorites WHERE user_id = $1', [userId]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User preferences not found' });
    } else {
      res.json(result.rows); 
    }
  } catch (error) {
    console.error('Error retrieving preferences:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
