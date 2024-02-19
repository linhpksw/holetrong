const { MongoClient } = require('mongodb');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const url = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(url);

const connect = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        const familiesCollection = db.collection('families');
        return familiesCollection;
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
};

module.exports = connect;
