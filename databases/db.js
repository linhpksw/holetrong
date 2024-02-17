const { MongoClient } = require('mongodb');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const url = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(url);

async function connect() {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const familiesCollection = db.collection('families');
    return { db, familiesCollection };
}

module.exports = { connect };
