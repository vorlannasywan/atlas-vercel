const express = require('express');
const corsMiddleware = require('../middlewares/corsMiddleware');
const dataRoutes = require('../routes/dataRoutes');
const { connectToDB } = require('../controllers/dataController');

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());

// Routes
app.use('/api', dataRoutes);

// Fungsi handler untuk Vercel
module.exports = async (req, res) => {
  try {
    await connectToDB(); // Pastikan koneksi ke MongoDB
    app(req, res); // Pass the request and response to Express
  } catch (err) {
    res.status(500).json({ message: "Failed to connect to database.", error: err.message });
  }
};
