const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const { Pool } = require('pg');

// Configure your PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost', // Typically 'localhost' if running locally
  database: 'postgres',
  password: 'admin123',
  port: 5432, // Default PostgreSQL port
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((error) => console.error('PostgreSQL connection error:', error));
    
  app.get('/users/:id', (req, res) => {
    let id = req.params.id; // Corrected to req.params.id
    pool.query('SELECT * FROM "AllUser" WHERE phone = $1', [id], (error, result) => {
      if (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching todos' });
      } else {
        res.json(result.rows);
      }
    });
  });

 /*app.post('/addusers', (req, res) => {
    let id = req.params; // Corrected to req.params.id
    pool.query('Insert into "AllUser"' ,(error, result) => {
      if (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching todos' });
      } else {
        res.json(result.rows);
      }
    });
  });*/


  app.post('/addusers', (req, res) => {
    const {phone, fullname, email,id } = req.body; // Assuming you're expecting 'username' and 'email' in the request body
  
    // Assuming "AllUser" is the name of the table and you want to insert a new user with 'username' and 'email' fields
    const query = 'INSERT INTO "AllUser" (phone,fullname, email,id) VALUES ($1, $2,$3,$4)';
    const values = [phone,fullname, email,id];
  
    pool.query(query, values, (error, result) => {
      if (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'Error inserting user' });
      } else {
        res.json({ message: 'User added successfully' });
      }
    });
  });

  app.post('/placedorders', (req, res) => {
    const {phone, fullname, email,id } = req.body; // Assuming you're expecting 'username' and 'email' in the request body
  
    // Assuming "AllUser" is the name of the table and you want to insert a new user with 'username' and 'email' fields
    const query = 'INSERT INTO "AllOrders" (phone,fullname, email,id) VALUES ($1, $2,$3,$4)';
    const values = [phone,fullname, email,id];
  
    pool.query(query, values, (error, result) => {
      if (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'Error inserting user' });
      } else {
        res.json({ message: 'User added successfully' });
      }
    });
  });
  