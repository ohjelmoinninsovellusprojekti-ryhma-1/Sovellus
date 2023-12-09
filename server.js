const bcrypt = require ('bcrypt'); //yhdistää mySQL tietokantaan
const express = require ('express'); //Sovelluskehitys moduuli, jossa useita työkaluja esim. HTTP pyynnön käsittelyyn
const bodyParser = require ('body-parser'); //Auttaa käsittelemään HTTP pyynnön rungon tiedot.
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3001;

app.set('view engine', "ejs");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pgPool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    password: 'kissa123',
    database: 'moviehubtietokanta',
    port: 5432,
});

pgPool.connect((err) => {
    if(err){
        console.error(err.message);
    };
});

app.post('/login', async (req, res) => {
    const { password, username } = req.body; 
    
    try {

    const result = await pgPool.query('SELECT * FROM users WHERE username = $1',
     [username]);

    
    if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid username or password'});
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        res.status(200).json({ message: 'Login successful'});
    } else {

    return res.status(401).json({error: 'Invalid username or password'});
    }

    } catch (error) {
        console.error('Error during login:', error)
        res.status(500).json({error: 'Internal server error'});
    }
});

app.post('/register', async (req, res) => {
    const {firstname, secondname, username, password, email, pronouns} = req.body; 
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, 11);

    try {
        const result = await pgPool.query('INSERT INTO users (firstname, secondname, username, password, email, pronouns) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [firstname, secondname, username, hashedPassword, email, pronouns]);

        console.log('User registered. Now login', result.rows[0]);
        res.status(201).json({ message: 'Registration successful'});
    }
    catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ message: 'Registration failed:'});
    }
});

app.get('/api/data', async (req, res) => {
    try {
      const [rows, fields] = await pool.query('SELECT * FROM favorites');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
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

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});

