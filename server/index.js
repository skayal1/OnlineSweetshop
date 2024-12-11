import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'orders.db'));

const app = express();
app.use(cors());
app.use(express.json());

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    variant_id TEXT NOT NULL,
    variant_name TEXT NOT NULL,
    price REAL NOT NULL,
    total_amount REAL NOT NULL,
    timestamp TEXT NOT NULL
  )
`);

// API endpoint to save order
app.post('/api/orders', (req, res) => {
  const { id, name, phone, quantity, variant, timestamp } = req.body;
  const total_amount = variant.price * quantity;

  try {
    const stmt = db.prepare(`
      INSERT INTO orders (id, name, phone, quantity, variant_id, variant_name, price, total_amount, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      name,
      phone,
      quantity,
      variant.id,
      variant.name,
      variant.price,
      total_amount,
      timestamp
    );

    res.json({ success: true, message: 'Order saved successfully' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ success: false, message: 'Error saving order' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});