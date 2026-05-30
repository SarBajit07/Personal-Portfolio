import express from 'express';
import { query } from '../db.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// GET all skills (public)
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM skills ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ message: 'Error fetching skills' });
  }
});

// POST new skill category (admin only)
router.post('/', verifyToken, async (req, res) => {
  const { category, items } = req.body;

  if (!category || !items) {
    return res.status(400).json({ message: 'Category name and items array are required' });
  }

  try {
    const result = await query(
      'INSERT INTO skills (category, items) VALUES ($1, $2) ON CONFLICT (category) DO UPDATE SET items = $2 RETURNING *',
      [category, items]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating skill category:', error);
    res.status(500).json({ message: 'Error creating skill category' });
  }
});

// PUT update skill category (admin only)
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { category, items } = req.body;

  if (!category || !items) {
    return res.status(400).json({ message: 'Category name and items array are required' });
  }

  try {
    const result = await query(
      'UPDATE skills SET category = $1, items = $2 WHERE id = $3 RETURNING *',
      [category, items, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Skill category not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating skill category:', error);
    res.status(500).json({ message: 'Error updating skill category' });
  }
});

// DELETE skill category (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await query('DELETE FROM skills WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Skill category not found' });
    }

    res.json({ message: 'Skill category deleted successfully', skill: result.rows[0] });
  } catch (error) {
    console.error('Error deleting skill category:', error);
    res.status(500).json({ message: 'Error deleting skill category' });
  }
});

export default router;
