const { MongoClient } = require('mongodb');
require('dotenv').config(); // Menggunakan dotenv untuk membaca file .env

// URI MongoDB menggunakan variabel lingkungan atau fallback
const uri = process.env.MONGO_URI || "mongodb+srv://vorlan:vorlan@cluster0.onijy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

let collection; // Variabel untuk menyimpan koleksi database

// Fungsi untuk koneksi ke database
async function connectToDB() {
  try {
    if (!client.isConnected || !client.isConnected()) {
      await client.connect();
      console.log("Connected to MongoDB");
    }
    const db = client.db('tugas6iot'); // Ganti dengan nama database Anda
    collection = db.collection('data'); // Ganti dengan nama koleksi Anda
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

// Fungsi untuk menyimpan data ke database
async function saveData(data) {
  try {
    const { temperature, humidity, gas } = data;
    const reading = {
      temperature,
      humidity,
      gas,
      timestamp: new Date()
    };
    await collection.insertOne(reading);
    console.log("Data saved successfully");
  } catch (error) {
    console.error("Failed to save data:", error);
    throw error;
  }
}

// Fungsi untuk mengambil semua data dari database
async function getAllData() {
  try {
    const data = await collection.find({}, { projection: { _id: 0 } }).toArray();
    return data.map(record => ({
      ...record,
      timestamp: record.timestamp.toISOString()
    }));
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
}

module.exports = {
  connectToDB,
  saveData,
  getAllData
};
