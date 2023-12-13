const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = 3001;
const bcrypt = require ('bcrypt');

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'myuser',
  host: 'localhost',
  database: 'mydatabase',
  password: 'mypassword',
  port: 5432,
 // ssl: true
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Käyttäjän tietojen päivittäminen!!
app.post('/user', async (req, res) => {
  const { id, name, email, birthdate, phone_number, address, pronouns } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2, birthdate = $3, phone_number = $4, address = $5, pronouns = $6 WHERE id = $7 RETURNING *',
      [name, email, birthdate, phone_number, address, pronouns, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Käyttäjän tietojen hakeminen!!
app.get('/user-get', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM info');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ryhmien hakeminen!!
app.get('/groups', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM groups');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ryhmän nimen päivittäminen!!
app.put('/groups/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const result = await pool.query(
      'UPDATE groups SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating group name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Uuden ryhmän luominen!!
app.post('/groups', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO groups (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Tässä serverikoodi Make A Newille!!
app.post('/api/createGroup', async (req, res) => {
  const { groupName, groupDescription, ownerId } = req.body;
  console.log('Received create group request. Request body:', req.body);

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const result = await client.query(
      'INSERT INTO groups (group_name, group_description, owner_id) VALUES ($1, $2, $3) RETURNING *',
      [groupName, groupDescription, ownerId]
    );

    await client.query('COMMIT');

    console.log('Group creation successful');
    res.json(result.rows[0]);

  } catch (error) {
    await client.query('ROLLBACK');

    console.error('Error creating group:', error);

    res.status(500).json({ success: false, error: 'Internal Server Error' });

  } finally {
    client.release();
  }
});

app.get('/api/groups', async (req, res) => {
  try {
    const result = await pool.query('SELECT group_name, group_description FROM groups');
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving groups:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/group/:groupId', async (req, res) => {
  const groupId = req.params.groupId;

  try {
    const result = await pool.query('SELECT * FROM groups WHERE group_id = $1', [groupId]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Group not found' });
    } else {
      res.json(result.rows[0]);
    }

  } catch (error) {
    console.error('Error retrieving group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ryhmän poistaminen!!
app.delete('/groups/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM groups WHERE id = $1 RETURNING *',
      [id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error deleting group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/groups/joined-groups', async (req, res) => {
  const userId = req.query.userId; // Olettaen, että käyttäjän id välitetään query-parametrina
  try {
    const result = await pool.query(
      'SELECT * FROM groups WHERE id IN (SELECT group_id FROM user_groups WHERE user_id = $1)',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching joined groups:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/groups/owned-groups', async (req, res) => {
  const userId = req.query.userId; // Olettaen, että käyttäjän id välitetään query-parametrina
  try {
    const result = await pool.query('SELECT * FROM groups WHERE owner_id = $1', [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching owned groups:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/groups/join/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.body.userId; // Olettaen, että käyttäjän id välitetään pyynnön rungossa
  try {
    await pool.query('INSERT INTO user_groups (user_id, group_id) VALUES ($1, $2)', [userId, id]);
    res.status(200).send('Joined group successfully');
  } catch (error) {
    console.error('Error joining group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/groups/leave/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.body.userId; // Olettaen, että käyttäjän id välitetään pyynnön rungossa
  try {
    await pool.query('DELETE FROM user_groups WHERE user_id = $1 AND group_id = $2', [userId, id]);
    res.status(200).send('Left group successfully');
  } catch (error) {
    console.error('Error leaving group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/*app.listen(3001, () => {
  console.log('Server is running on port 3001');
// }); */

/*const PORT = process.env.PORT || 3001;  
app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`);
});*/
