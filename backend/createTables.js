const pool = require('./db');
const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Note (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        attachments TEXT,
        classid INT,
        tags TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table created successfully.');
  } catch (err) {
    console.error('Error creating table:', err.message);
  } finally {
    pool.end();
  }
};

createTable();
