const express = require('express');
const router = express.Router();
const pool = require('../database/db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Note"');
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.post('/', async (req, res) => {
    console.log(req.body);
    const { title, content, classid } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO "Note" (title, content, classid) VALUES ($1, $2, $3) RETURNING *',
            [title, content, classid]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(400).send('Server error');
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Extract note ID from the URL
    try {
        const result = await pool.query('DELETE FROM "Note" WHERE id = $1', [id]);
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
