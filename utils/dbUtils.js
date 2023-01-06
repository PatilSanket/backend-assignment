const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

let db;

// Connect to the MongoDB instance
const client = new MongoClient(process.env.MONGO_URI);
async function initConnection() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    db = client.db('youtube');
    //await db.collection('videos').insertOne({'name':'Oden'});
    console.log('Connected successfully to server');
  } catch(err) {
    console.log(`Connected FAILED ${err}`);
  }
}

module.exports = db;
module.exports = initConnection;