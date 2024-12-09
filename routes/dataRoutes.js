const express = require('express');
const { saveData, getAllData } = require('../controllers/dataController');

const router = express.Router();

// Rute untuk menyimpan data
router.post('/data', async (req, res) => {
  try {
    const { temperature, humidity, gas } = req.body;

    if (temperature !== undefined && humidity !== undefined && gas !== undefined) {
      await saveData(req.body);
      res.status(200).json({ message: "Data received successfully", status: "success" });
    } else {
      res.status(400).json({ message: "Invalid data received", status: "error" });
    }
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Internal server error", status: "error" });
  }
});

// Rute untuk mengambil data
router.get('/get_data', async (req, res) => {
  try {
    const data = await getAllData();
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "No data found", status: "error" });
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Internal server error", status: "error" });
  }
});

module.exports = router;
