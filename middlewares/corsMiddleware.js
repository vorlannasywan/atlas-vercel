const cors = require('cors');

const corsMiddleware = cors({
  origin: '*', // Mengizinkan semua asal
  methods: ['GET', 'POST'], // Metode HTTP yang diizinkan
  allowedHeaders: ['Content-Type'] // Header yang diizinkan
});

module.exports = corsMiddleware;
