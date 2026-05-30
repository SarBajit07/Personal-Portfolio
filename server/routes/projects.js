import express from 'express';
import { query } from '../db.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// GET all projects (public)
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM projects ORDER BY order_index ASC, id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

// POST new project (admin only)
router.post('/', verifyToken, async (req, res) => {
  const { title, description, tech, link, github_link, order_index } = req.body;

  if (!title || !description || !tech) {
    return res.status(400).json({ message: 'Title, description, and tech list are required' });
  }

  try {
    const result = await query(
      `INSERT INTO projects (title, description, tech, link, github_link, order_index)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, description, tech, link || '', github_link || '', order_index || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Error creating project' });
  }
});

// PUT update project (admin only)
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, tech, link, github_link, order_index } = req.body;

  if (!title || !description || !tech) {
    return res.status(400).json({ message: 'Title, description, and tech list are required' });
  }

  try {
    const result = await query(
      `UPDATE projects 
       SET title = $1, description = $2, tech = $3, link = $4, github_link = $5, order_index = $6
       WHERE id = $7 RETURNING *`,
      [title, description, tech, link, github_link, order_index, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Error updating project' });
  }
});

// DELETE project (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully', project: result.rows[0] });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project' });
  }
});

export default router;
