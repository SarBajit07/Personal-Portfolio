import express from 'express';
import { query } from '../db.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// GET all timeline items (public)
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM timeline ORDER BY type DESC, order_index ASC, id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching timeline:', error);
    res.status(500).json({ message: 'Error fetching timeline' });
  }
});

// POST new timeline item (admin only)
router.post('/', verifyToken, async (req, res) => {
  const { type, period, title, organization, description, order_index } = req.body;

  if (!type || !period || !title || !organization) {
    return res.status(400).json({ message: 'Type, period, title, and organization are required' });
  }

  if (type !== 'education' && type !== 'experience') {
    return res.status(400).json({ message: "Type must be either 'education' or 'experience'" });
  }

  try {
    const result = await query(
      `INSERT INTO timeline (type, period, title, organization, description, order_index)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [type, period, title, organization, description || '', order_index || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating timeline item:', error);
    res.status(500).json({ message: 'Error creating timeline item' });
  }
});

// PUT update timeline item (admin only)
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { type, period, title, organization, description, order_index } = req.body;

  if (!type || !period || !title || !organization) {
    return res.status(400).json({ message: 'Type, period, title, and organization are required' });
  }

  if (type !== 'education' && type !== 'experience') {
    return res.status(400).json({ message: "Type must be either 'education' or 'experience'" });
  }

  try {
    const result = await query(
      `UPDATE timeline 
       SET type = $1, period = $2, title = $3, organization = $4, description = $5, order_index = $6
       WHERE id = $7 RETURNING *`,
      [type, period, title, organization, description, order_index, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Timeline item not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating timeline item:', error);
    res.status(500).json({ message: 'Error updating timeline item' });
  }
});

// DELETE timeline item (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await query('DELETE FROM timeline WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Timeline item not found' });
    }

    res.json({ message: 'Timeline item deleted successfully', item: result.rows[0] });
  } catch (error) {
    console.error('Error deleting timeline item:', error);
    res.status(500).json({ message: 'Error deleting timeline item' });
  }
});

export default router;
