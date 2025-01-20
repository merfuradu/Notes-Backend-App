const express = require('express');
const router = express.Router();
const pool = require('../database/db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM notes');
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.post('/', async (req, res) => {
    const { title, content, classId } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO notes (title, content, class_id) VALUES ($1, $2, $3) RETURNING *',
            [title, content, classId]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Extract note ID from the URL
    try {
        const result = await pool.query('DELETE FROM notes WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send('Note not found');
        }
        res.status(200).send('Note deleted');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;
