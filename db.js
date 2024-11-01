const { MongoClient } = require('mongodb');


const uri = 'your_mongodb_connection_string';
const client = new MongoClient(uri);

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('your_database_name'); // Replace with your database name
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    process.exit(1); // Exit process if the connection fails
  }
}

// Function to get the DB instance
function getDB() {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
}

// Export the connectDB and getDB functions
module.exports = { connectDB, getDB };
