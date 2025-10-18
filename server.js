import express from 'express';
import { pool } from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/profiles', async (req, res) => {
  const result = await pool.query('SELECT * FROM profiles ORDER BY id DESC');
  res.json(result.rows);
});

app.get('/api/profiles/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM profiles WHERE id=$1', [id]);
  res.json(result.rows[0]);
});

app.post('/api/profiles', async (req, res) => {
  const { name, role, image_url, bio } = req.body;
  const result = await pool.query('INSERT INTO profiles (name, role, image_url, bio) VALUES ($1,$2,$3,$4) RETURNING *', [name, role, image_url, bio]);
  res.status(201).json(result.rows[0]);
});

app.put('/api/profiles/:id', async (req, res) => {
  const { id } = req.params;
  const { name, role, image_url, bio } = req.body;
  const result = await pool.query('UPDATE profiles SET name=$1, role=$2, image_url=$3, bio=$4 WHERE id=$5 RETURNING *', [name, role, image_url, bio, id]);
  res.json(result.rows[0]);
});

app.delete('/api/profiles/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM profiles WHERE id=$1', [id]);
  res.json({ message: 'Profile deleted' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
